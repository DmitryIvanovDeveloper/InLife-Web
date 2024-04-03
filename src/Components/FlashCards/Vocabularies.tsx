import React, { useState, useEffect, ReactElement } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import NewCard from './NewCard/NewCard';
import { useWordsState } from '../../Data/useWords';
import VocabularyBlocks from '../VocabularyBlocks/VocabularyBlocks';
import DevidedLabel from '../Headers/DevidedLabel';

import './FlashCards.css'
import CreateNewCardModal from './NewCard/CreateNewCardModal';

export interface IFlashCardsProps {
    studentId: string;
}

export default function Vocabularies(props: IFlashCardsProps) {
    const theme = useTheme();
    const [editCardId, setEditCardId] = useState<string>("");

    const [wordsState] = useWordsState();
    const [isCreateCard, setIsCreateCard] = useState<boolean>(false);

    //TODO: Move to VocabularyCards


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
                ? <CreateNewCardModal onClose={onCloseModel} editCardId={editCardId} />
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