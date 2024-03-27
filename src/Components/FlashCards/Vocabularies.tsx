import React, { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import NewCard from './NewCard/NewCard';
import ICard from './ICard';
import { useWordsState } from '../../Data/useWords';
import VocabularyBlocks from '../VocabularyBlocks/VocabularyBlock';
import DevidedLabel from '../Headers/DevidedLabel';

import './FlashCards.css'

export interface IFlashCardsProps {
    studentId: string;
}

export default function Vocabularies(props: IFlashCardsProps) {
    const theme = useTheme();
    const [editCardId, setEditCardId] = useState<string>("");

    const [wordsState] = useWordsState();
    const [isCreateCard, setIsCreateCard] = useState<boolean>(false);

    //TODO: Move to VocabularyCards
    
    function Modal(): ReactElement {
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        
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

    const onCloseModel = () => {
        setEditCardId("");
        setIsCreateCard(false);
    }


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
                    studentId={props.studentId}
                    onEditCard={setEditCardId}
                    onCreateNewWord={() => setIsCreateCard(true)}
                />
             
            </Box>
        </Box>
    )
}