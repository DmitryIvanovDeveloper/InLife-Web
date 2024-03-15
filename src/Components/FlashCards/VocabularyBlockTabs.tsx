import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import Flashcard from './Flashcard';
import ICard from './ICard';



export interface IVocabularyBlockTabsProps {
    vocabularyBlocks: IStudentVocabularyBlockModel[];
    selectedVocabularyBlockIndex: string;
    setSelectedVocabularyBlockIndex: (index: string) => void
    cards: ICard[]
    onEditCard: (id: string) => void;
    onDeleteCard: (id: string) => void;
    onCreateBlock: () => void;
}

export default function VocabularyBlockTabs(props: IVocabularyBlockTabsProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        localStorage.setItem("last vb", newValue);
        props.setSelectedVocabularyBlockIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                <Tabs
                    value={props.selectedVocabularyBlockIndex}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {props.vocabularyBlocks.map((vb, index) => (
                        <Tab label={vb.name} value={vb.id} />
                    ))}

                    
                </Tabs>
                <Tab onClick={props.onCreateBlock} label={"+"} />

            </Box>
            {props.cards.map((data, index) => (
                <Flashcard
                    flashcard={data}
                    onEdit={props.onEditCard}
                    onDelete={props.onDeleteCard}
                />


            ))}
        </Box>
    );
}