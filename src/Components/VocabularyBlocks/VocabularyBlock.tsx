import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IStudentVocabularyBlockModel from '../../ThereGame.Business/Models/IStudentVocabularyBlock';
import { IconButton, Typography } from '@mui/material';
import StudentCalendarActivity from '../Statistic/StudentDialogueStatistics/StudentCalendarActivity/StudentCalendarActivity';
import { useEffect, useState } from 'react';
import VocabularyCards from '../VocabuaryCard/VocabularyCards';
import useVocabularyBlockQueriesApi from '../../ThereGame.Api/Queries/VocabularyBlockQueriesApi';
import QuizlGameStatistic from './GameStatistic/QuizlGameStatistic';
import BuildWordGameStatistic from './GameStatistic/BuildWordGameStatistic';
import TranslateWordGameStatistic from './GameStatistic/TranslateWordGameStatistic';
import { isOnRange } from '../../ThereGame.Infrastructure/Helpers/DatesCompare';
import WordsList from '../WordsList/WordsList';
import LinarProgressCustom from '../CircularProgress';



export interface IVocabularyBlockTabsProps {
    studentId: string;
    onEditCard: (id: string) => void;
    onCreateNewWord: () => void;
}


export default function VocabularyBlocks(props: IVocabularyBlockTabsProps) {

    const vocabularyBlockQueriesApi = useVocabularyBlockQueriesApi();

    const [vocabularyBlocks, setVocabularyBlocks] = useState<IStudentVocabularyBlockModel[]>([]);

    const [selectedVcabularyBlockId, setSelectedVocabularyBlockId] = useState<string>("")
    const [selectedVcabularyBlock, setSelectedVocabularyBlock] = useState<IStudentVocabularyBlockModel | null>();
    const [playedGamesDate, setPlayedGamesdDate] = useState<Date[]>([]);

    const [selectedStartDate, setSelecetedStartDate] = useState<Date>(new Date());
    const [selectedEndDate, setSelecetedEndDate] = useState<Date>(new Date());

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        localStorage.setItem("last vb", newValue);
        setSelectedVocabularyBlockId(newValue);
    };

    function BlockName(name: string, date: Date) {
        var updatedDate = new Date(date);

        return (
            <Box>
                <Typography>{name}</Typography>
                <Typography>{`${updatedDate.toISOString().substring(0, 10)}`}</Typography>
            </Box>
        )
    }

    // Quieries API
    const onCreateBlock = async () => {
        const data = await vocabularyBlockQueriesApi.create(props.studentId, vocabularyBlocks.length);
        setVocabularyBlocks(data);
    }
    const onDeleteBlock = async () => {
        const data = await vocabularyBlockQueriesApi.delete(selectedVcabularyBlockId, props.studentId);
        setVocabularyBlocks(data);
    }
    const onUpdateVocabularyBlock = async (wordId?: string, name?: string) => {

        if (!selectedVcabularyBlock) {
            return;
        }

        var wordsId = [...selectedVcabularyBlock.wordsId]
        if (!!wordId && wordsId.includes(wordId)) {

            wordsId = wordsId.filter(id => id != wordId);
        }
        else if (!!wordId) {
            wordsId.push(wordId);
        }

        var updatedVocabularyBlock: IStudentVocabularyBlockModel = {
            id: selectedVcabularyBlock.id,
            studentId: selectedVcabularyBlock.studentId,
            name: name ?? selectedVcabularyBlock.name,
            wordsId: wordsId,
            createdAt: selectedVcabularyBlock.createdAt,
            quizlGameStatistics: selectedVcabularyBlock.quizlGameStatistics,
            translateWordsGameStatistics: selectedVcabularyBlock.translateWordsGameStatistics,
            buildWordsGameStatistics: selectedVcabularyBlock.buildWordsGameStatistics,
        }

        const data = await vocabularyBlockQueriesApi.update(updatedVocabularyBlock);
        setVocabularyBlocks(data);
    }

    const deleteStudentCard = (id: string) => {
        onUpdateVocabularyBlock(id);
    }

    const sortByDate = (vocabularyBlocks: IStudentVocabularyBlockModel[]) => {
        return vocabularyBlocks.sort((a, b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        })
    }

    // UseEffects

    useEffect(() => {
        vocabularyBlockQueriesApi.get(props.studentId)
            .then(data => {
                setVocabularyBlocks(sortByDate(data));
                setSelectedVocabularyBlockId(data[0].id)
            });
    }, []);

    useEffect(() => {
        if (!selectedVcabularyBlockId) {
            
            return;
        }

        const selectedVocabularyBlock = vocabularyBlocks.find(vocabularyBlock => vocabularyBlock.id == selectedVcabularyBlockId);

        setSelectedVocabularyBlock(selectedVocabularyBlock);
    }, [selectedVcabularyBlockId, vocabularyBlocks]);

    useEffect(() => {
        if (!selectedVcabularyBlock) {
            return;
        }

        const quizlPlayedDays = selectedVcabularyBlock.quizlGameStatistics.map(statistic => statistic.createdAt);
        const buildWordPlayedDays = selectedVcabularyBlock.buildWordsGameStatistics.map(statistic => statistic.createdAt);
        const translatedWordPlayedDays = selectedVcabularyBlock.translateWordsGameStatistics.map(statistic => statistic.createdAt);

        const playedGamesDate = [...quizlPlayedDays, ...buildWordPlayedDays, ...translatedWordPlayedDays]

        setPlayedGamesdDate(playedGamesDate);

    }, [selectedVcabularyBlock])

    if (!vocabularyBlocks.length) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LinarProgressCustom name={'Laoding...! Please wait'} />
            </Box>
        )
    }
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: "90%", mr: 10 }}>
                <WordsList onSelectWord={props.onEditCard} onAddWord={onUpdateVocabularyBlock} onCreateNewWord={props.onCreateNewWord} />
            </Box>

            <Box sx={{ borderBottom: 0, borderColor: 'divider', display: 'flex', justifyContent: 'center', minWidth: "100%" }}>

                <IconButton onClick={onDeleteBlock}>
                    -
                </IconButton>

                <Tabs
                    value={selectedVcabularyBlockId}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {vocabularyBlocks.map((vb, index) => (
                        <Tab
                            label={BlockName(vb.name, vb.createdAt)}
                            value={vb.id}
                        />
                    ))}
                </Tabs>

                <IconButton onClick={onCreateBlock}>
                    +
                </IconButton>
            </Box>


            <Box display='flex' justifyContent='flex-end' width='100%' marginRight={15}>
                <StudentCalendarActivity onChange={setSelecetedStartDate} highlightDates={playedGamesDate} date={selectedStartDate} label="Start date" />
                <StudentCalendarActivity onChange={setSelecetedEndDate} highlightDates={playedGamesDate} date={selectedEndDate} label="End date" />
            </Box>

            <Box display='flex'>
                <QuizlGameStatistic
                    quizlGameStatistics={
                        selectedVcabularyBlock?.quizlGameStatistics
                            .filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
                <BuildWordGameStatistic
                    buildWordGamesStatistics={
                        selectedVcabularyBlock?.buildWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
                <TranslateWordGameStatistic
                    translateWordGamesStatistics={selectedVcabularyBlock?.translateWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
            </Box>

            <VocabularyCards
                wordsId={selectedVcabularyBlock?.wordsId ?? []}
                quizlGamesStatistics={selectedVcabularyBlock?.quizlGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                buildWordsGameStatistic={selectedVcabularyBlock?.buildWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                translateWordsGameStatistic={selectedVcabularyBlock?.translateWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                onEditCard={props.onEditCard}
                onDeleteCard={deleteStudentCard}
            />
        </Box>
    );
}