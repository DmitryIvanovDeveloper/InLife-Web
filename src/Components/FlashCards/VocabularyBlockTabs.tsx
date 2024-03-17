import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import Flashcard from './Flashcard';
import ICard from './ICard';
import { Grid, Typography } from '@mui/material';
import DevidedLabel from '../Headers/DevidedLabel';



export interface IVocabularyBlockTabsProps {
    vocabularyBlocks: IStudentVocabularyBlockModel[];
    selectedVocabularyBlockIndex: string;
    setSelectedVocabularyBlockIndex: (index: string) => void
    cards: ICard[]
    onEditCard: (id: string) => void;
    onDeleteCard: (id: string) => void;
    onCreateBlock: () => void;
    onDeleteBlock: () => void;
    isCardSideFront: boolean;

}

export default function VocabularyBlockTabs(props: IVocabularyBlockTabsProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        localStorage.setItem("last vb", newValue);
        props.setSelectedVocabularyBlockIndex(newValue);
    };

    function BlockName(name: string, date: Date) {
       var updatedDate = new Date(date)
        return (
            <Box>
                <Typography>{name}</Typography>
                <Typography>{`${updatedDate.toISOString().substring(0, 10)}`}</Typography>
            </Box>

        )

    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', minWidth: "100%" }}>
                <Tab onClick={props.onDeleteBlock} label={"-"} />

                <Tabs
                    value={props.selectedVocabularyBlockIndex}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {props.vocabularyBlocks.map((vb, index) => (
                        <Tab
                            label={BlockName(vb.name, vb.createdAt)}
                            value={vb.id} />
                    ))}


                </Tabs>
                <Tab onClick={props.onCreateBlock} label={"+"} />

            </Box>
            <Grid container width='50%' >
                {props.cards.map((data, index) => (
                    <Grid xs={4} item margin={1}>
                        <Flashcard
                            isCardSideFront={props.isCardSideFront}
                            flashcard={data}
                            onEdit={props.onEditCard}
                            onDelete={props.onDeleteCard}
                        />

                    </Grid>

                ))}
            </Grid>

        </Box>
    );
}