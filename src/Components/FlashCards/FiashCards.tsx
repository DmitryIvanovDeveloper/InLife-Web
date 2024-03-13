import React, { useState, useEffect, useRef, ReactElement } from 'react';
import './App.css'
import { Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, Fab, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlashCard from './Flashcard';
import AddIcon from '@mui/icons-material/Add';
import Draggable from 'react-draggable';
import NewCard from './NewCard';
import useWordsQueriesApi from '../../ThereGame.Api/Queries/WordsQueriesApi';
import ICard from './Card';
import { LanguageType } from '../../Data/LanguageType';

const card = {
    id: `1`,
    question: "Possible",
    answer: "Возможно",
    options: 1
}


export default function FlashCards() {
    const [flashcards, setFlashCards] = useState([card, card, card, card, card, card, card,])
    const [isCreateNewCard, setIsCreateNewCard] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const wordQueriesApi = useWordsQueriesApi();

    useEffect(() => {
        wordQueriesApi.get()
        .then(data => {

            const cards: ICard[] = data.map(word => {

                const filterdByLanguage = word.wordTranslates.filter(t => t.language == LanguageType.Russian);
                var answers = !filterdByLanguage[0]?.translates?.length ? '' :  filterdByLanguage[0]?.translates[0];
                const card: ICard = {
                    id: word.id,
                    question: word.word, 
                    answer: answers,
                    options: 0
                }
    
                return card;
            });
            setFlashCards(cards);
        });
    }, []);

    function Modal(): ReactElement {
        return (
            <Dialog
                fullScreen={fullScreen}
                open={isCreateNewCard}
                onClose={() => setIsCreateNewCard(false)}
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
                        <NewCard />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsCreateNewCard(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    if (isCreateNewCard) {
        return (
           <Modal />
        )
    }
    return (
        <Box
            margin='10px'
            width='30%'
        >
            <Box className="card-grid">
                {flashcards.map(card => (
                    <Draggable>
                        <FlashCard flashcard={card} />
                    </Draggable>
                ))}
            </Box>
            <Fab
                aria-label="save"
                color="primary"
                onClick={() => setIsCreateNewCard(!isCreateNewCard)}
                sx={{ position: 'absolute', right: 0, bottom: 0 }}
            >
                {<AddIcon />}
            </Fab>
        </Box>

    )
}