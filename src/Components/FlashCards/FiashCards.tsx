import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Avatar, Box, Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, Fab, Grid, List, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewCard from './NewCard';
import useWordsQueriesApi from '../../ThereGame.Api/Queries/WordsQueriesApi';
import ICard from './ICard';
import useStudentQueriesApi from '../../ThereGame.Api/Queries/StudentQueriesApi';
import './FlashCards.css'
import { useWordsState } from '../../Data/useWords';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import VocabularyBlockTabs from './VocabularyBlockTabs';
import { LanguageType } from '../../Data/LanguageType';
import WordsList from '../WordsList/WordsList';

export interface IFlashCardsProps {
    studentId: string;
}

export default function FlashCards(props: IFlashCardsProps) {
    const [flashcards, setFlashCards] = useState<ICard[]>([])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [editCardId, setEditCardId] = useState<string>("");

    const wordQueriesApi = useWordsQueriesApi();
    const studentQueriesApi = useStudentQueriesApi();
    const [wordsState] = useWordsState();
    const [vocabularyBlocks, setVocabularyBlocks] = useState<IStudentVocabularyBlockModel[]>([]);
    const [selectedVocabularyBlockIndex, setSelectedVocabularyBlockIndex] = useState<string>("");
    const [selectedVocabularyBlockData, setSelectedVocabularyBlockData] = useState<ICard[]>([]);
    const [isCreateCard, setIsCreateCard] = useState<boolean>(false);

    useEffect(() => {
        wordQueriesApi.get()
    }, []);

    useEffect(() => {
        studentQueriesApi.getVocabularyBlocks(props.studentId)
            .then(data => {
                setVocabularyBlocks(data);
            });
    }, []);


    useEffect(() => {
        var expectedBlockData = wordsState.filter(ws => vocabularyBlocks.find(vb => vb.id == selectedVocabularyBlockIndex)?.wordsId.includes(ws.id));
        var cards = expectedBlockData.map(card => {
            var wordDtaByLanguage = card.wordTranslates.find(wt => wt.language == LanguageType.Russian);
            return {
                id: card.id,
                question: card.word,
                answers: wordDtaByLanguage?.translates ?? [],
                options: 0
            }
        })
        setSelectedVocabularyBlockData(cards)
    }, [vocabularyBlocks, selectedVocabularyBlockIndex])


    function Modal(): ReactElement {
        return (
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClose={onCloseModel}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "800px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogContent >
                    <DialogContentText>
                        <NewCard
                            studentId={props.studentId}
                            cardData={wordsState.find(flashCard => flashCard.id == editCardId)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseModel} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const onEditCard = (id: string) => {
        setEditCardId(id);
    }

    const onCloseModel = () => {
        setEditCardId("");
        setIsCreateCard(false);
    }

    const onUpdateVocabularyBlock = async (wordId?: string, name?: string) => {

        const expectedVocabularyBlock = vocabularyBlocks.find(vb => vb.id == selectedVocabularyBlockIndex);
        if (!expectedVocabularyBlock) {
            return;
        }

        var wordsId = [...expectedVocabularyBlock.wordsId]
        if (!!wordId && wordsId.includes(wordId)) {

            wordsId = wordsId.filter(id => id != wordId);
        }
        else if (!!wordId) {
            wordsId.push(wordId);
        }
        var vocabularyBlock: IStudentVocabularyBlockModel = {
            id: expectedVocabularyBlock.id,
            studentId: expectedVocabularyBlock.studentId,
            name: name ?? expectedVocabularyBlock.name,
            wordsId: wordsId,
            order: expectedVocabularyBlock.order
        }

        const data = await studentQueriesApi.updateVocabularyBlock(vocabularyBlock);
        setVocabularyBlocks(data);
    }

    const onCreateBlock = async () => {
        const data = await studentQueriesApi.createVocabularyBlock(props.studentId, vocabularyBlocks.length);
        setVocabularyBlocks(data);
    }

    const deleteStudentCard = (id: string) => {
        onUpdateVocabularyBlock(id);
    }


    useEffect(() => {
        var id = localStorage.getItem("last vb");
        if (!id) {
            setSelectedVocabularyBlockIndex(vocabularyBlocks[0]?.id ?? "");
            return;
        }
        setSelectedVocabularyBlockIndex(id);
    }, [vocabularyBlocks]);

    if (!!editCardId || isCreateCard) {
        return (
            <Modal />
        )
    }
    return (
        <Box
            width='100%'
            height='100vh'
            display='flex'
            flexDirection='row'
        >
            <Box
                width="900px"
            >

            </Box>

            <Box
                width="100%"
                marginTop='100px'
                marginLeft='40px'
                display='flex'
            >
                <VocabularyBlockTabs
                    vocabularyBlocks={vocabularyBlocks}
                    setSelectedVocabularyBlockIndex={setSelectedVocabularyBlockIndex}
                    selectedVocabularyBlockIndex={selectedVocabularyBlockIndex}
                    cards={selectedVocabularyBlockData}
                    onEditCard={setEditCardId}
                    onDeleteCard={deleteStudentCard}
                    onCreateBlock={onCreateBlock}
                />
                <WordsList onSelectWord={onEditCard} onAddWord={onUpdateVocabularyBlock} />

            </Box>


            <Fab
                aria-label="save"
                color="primary"
                onClick={() => setIsCreateCard(true)}
                sx={{ position: 'absolute', right: 0, bottom: 0 }}
            >
                {<AddIcon />}
            </Fab>
        </Box>

    )
}