import React, { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import NewCard from './NewCard/NewCard';
import useWordsQueriesApi from '../../ThereGame.Api/Queries/WordsQueriesApi';
import ICard from './ICard';
import useStudentQueriesApi from '../../ThereGame.Api/Queries/StudentQueriesApi';
import { useWordsState } from '../../Data/useWords';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import VocabularyBlocks from '../VocabularyBlocks/VocabularyBlock';
import { LanguageType } from '../../Data/LanguageType';
import DevidedLabel from '../Headers/DevidedLabel';
import { useSelectedStudentVocabularyBlockCards } from '../../Data/useSelectedStudentVocabularyBlockCards';

import './FlashCards.css'

export interface IFlashCardsProps {
    studentId: string;
}

export default function FlashCards(props: IFlashCardsProps) {
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
    const [selectedStudentVocabularyBlockCards, setSelectedStudentVocabularyBlockCards] = useSelectedStudentVocabularyBlockCards();
    const [isPlay, setIsPlay] = useState<boolean>(false);

    useEffect(() => {
        wordQueriesApi.get()
    }, []);

    useEffect(() => {
        studentQueriesApi.get(props.studentId)
            .then(data => {
                setVocabularyBlocks(data);
            });
    }, []);

    const sorByDate = (vocabularyBlocks: IStudentVocabularyBlockModel[]) => {
        return vocabularyBlocks.sort((a, b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        })
    }

    useEffect(() => {
        var expectedBlockData = wordsState
            .filter(ws => sorByDate(vocabularyBlocks).find(vb => vb.id == selectedVocabularyBlockIndex)?.wordsId.includes(ws.id));

            const statistic = vocabularyBlocks.find(vb => vb.id == selectedVocabularyBlockIndex);

        var cards = expectedBlockData.map(card => {
            var wordDtaByLanguage = card.wordTranslates.find(wt => wt.language == LanguageType.Russian);

            const a = statistic?.quizlGameStatistics?.filter(qs => card.quizlGamesId.includes(qs.quizlGameId));
            const b = statistic?.translateWordsGameStatistics?.filter(qs => qs.wordId == wordDtaByLanguage?.wordId);
            const c = statistic?.buildWordsGameStatistics?.filter(qs => qs.wordId == wordDtaByLanguage?.wordId);

            return {
                id: card.id,
                question: card.word,
                answers: wordDtaByLanguage?.translates ?? [],
                options: 0,
                pictures: card.pictures,
                quizleGamesId: card.quizlGamesId,
                playedQuizlGame: a?.length ?? 0,
                playedWordTranslate: b?.length ?? 0,
                playedBuildWord: c?.length ?? 0,
            }
        })

        setSelectedVocabularyBlockData(cards)
        setSelectedStudentVocabularyBlockCards(cards);
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
                            maxWidth: "900px",  // Set your width here
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
            createdAt: expectedVocabularyBlock.createdAt,
            quizlGameStatistics: expectedVocabularyBlock.quizlGameStatistics,
            translateWordsGameStatistics: expectedVocabularyBlock.translateWordsGameStatistics,
        }

        const data = await studentQueriesApi.update(vocabularyBlock);
        setVocabularyBlocks(data);
    }

    const onCreateBlock = async () => {
        const data = await studentQueriesApi.create(props.studentId, vocabularyBlocks.length);
        setVocabularyBlocks(data);
    }
    const onDeleteBlock = async () => {
        const data = await studentQueriesApi.delete(selectedVocabularyBlockIndex, props.studentId);
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


    return (
        <Box
            width='100%'
            height='100vh'

        >
            {!!editCardId || isCreateCard
                ? <Modal />
                : null
            }

            <Button>Play</Button>
            <DevidedLabel name="Vocabulary Blocks" />

            <Box
                width="100%"
                marginLeft='40px'
                display='flex'
                justifyContent='center'

            >
                <VocabularyBlocks
                    vocabularyBlocks={vocabularyBlocks}
                    setSelectedVocabularyBlockIndex={setSelectedVocabularyBlockIndex}
                    selectedVocabularyBlockIndex={selectedVocabularyBlockIndex}
                    cards={selectedVocabularyBlockData}
                    onEditCard={setEditCardId}
                    onDeleteCard={deleteStudentCard}
                    onCreateBlock={onCreateBlock}
                    onDeleteBlock={onDeleteBlock}
                    isCardSideFront={isPlay}
                    onUpdateVocabularyBlock={onUpdateVocabularyBlock} 
                    setIsCreateCard={setIsCreateCard}
                />
             
            </Box>
        </Box>

    )
}