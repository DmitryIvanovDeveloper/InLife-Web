import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import Flashcard from '../FlashCards/Flashcard';
import ICard from '../FlashCards/ICard';
import { Grid, Typography } from '@mui/material';
import VocabularyBlockDataTabs from './VocabularyBlocakDataTabs';
import BuildWordGameTable from '../BuildWordStatisticTable/BuildWordStatisticTable';
import QuizlGameStatisticTable from '../QuizleGameStatisticTable/QuizlGameStatisticTable';
import TranslateWordGameTable from '../TranslateWordsGameStatisticTable/TranslateWordStatisticTable';
import WordsList from '../WordsList/WordsList';
import StudentCalendarActivity from '../Statistic/StudentDialogueStatistics/StudentCalendarActivity/StudentCalendarActivity';
import { useEffect, useState } from 'react';
import GamesStatisticsTabs from '../GamesStatistics/GamesStatistics';



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
    onUpdateVocabularyBlock: (id: string) => void;
    setIsCreateCard: (isCreated: boolean) => void;

}

export default function VocabularyBlocks(props: IVocabularyBlockTabsProps) {

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

    function Cards() {
        return (
            <Box >
                <WordsList onSelectWord={props.onEditCard} onAddWord={props.onUpdateVocabularyBlock} onCreateNewWord={() => props.setIsCreateCard(true)} />
                <Grid container width='100%' sx={{ mt: 10, justifyContent: 'center' }}>
                    {props.cards.map((data, index) => (
                        <Grid xs={2} item margin={1}>
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

        )
    }

    function GamesStatistics() {
        const [selectedDate, setSelectedDate] = useState<Date>(new Date());
        const [actionsDate, setActionsDate] = useState<Date[]>([]);
        const [currentVocabularyBlock, setCurrentVocabularyBlock] = useState<IStudentVocabularyBlockModel>();

        useEffect(() => {
            var expectedVocabularyBlock =  props.vocabularyBlocks.find(vb => vb.id == props.selectedVocabularyBlockIndex);

            setCurrentVocabularyBlock(expectedVocabularyBlock);

            var actionsQuizleGame = expectedVocabularyBlock?.quizlGameStatistics ?? [];
            var actionsTranslateWordsGame = expectedVocabularyBlock?.translateWordsGameStatistics ?? [];
            var actionsbuildWordsGame = expectedVocabularyBlock?.buildWordsGameStatistics ?? [];

            var actions = [
                actionsQuizleGame.map(statistic => statistic.createdAt),
                actionsTranslateWordsGame.map(statistic => statistic.createdAt),
                actionsbuildWordsGame.map(statistic => statistic.createdAt)
            ]
            setActionsDate(actions.flat());
        }, [props]);

        const xs = 4;
        return (
            <Box display='flex' justifyContent='center'>
                <Box width="90%">
                    <Box sx={{ mr: 3 }}>
                        <StudentCalendarActivity
                            onChange={setSelectedDate}
                            highlightDates={actionsDate}
                            date={selectedDate}
                        />
                    </Box>

                    <GamesStatisticsTabs
                        quizle={<QuizlGameStatisticTable selectedDate={selectedDate} quizlGameStatistics={currentVocabularyBlock?.quizlGameStatistics ?? []} />}
                        buildWords={<BuildWordGameTable selectedDate={selectedDate} buildWordsGameStatistics={currentVocabularyBlock?.buildWordsGameStatistics ?? []} />}
                        translatesWords={<TranslateWordGameTable selectedDate={selectedDate} translateWordsGameStatistics={currentVocabularyBlock?.translateWordsGameStatistics ?? []} />}
                    />

                </Box>
            </Box>


        )
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{ borderBottom: 0, borderColor: 'divider', display: 'flex', justifyContent: 'center', minWidth: "100%" }}>
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

            <VocabularyBlockDataTabs cards={Cards()} gamesStatistics={GamesStatistics()} />
        </Box>
    );
}