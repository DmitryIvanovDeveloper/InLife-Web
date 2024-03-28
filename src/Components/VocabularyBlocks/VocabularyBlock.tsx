import { Box, Tabs, Tab, Typography } from "@mui/material";
import { isOnRange } from "../../ThereGame.Infrastructure/Helpers/DatesCompare";
import StudentCalendarActivity from "../Statistic/StudentDialogueStatistics/StudentCalendarActivity/StudentCalendarActivity";
import VocabularyCards from "../VocabuaryCard/VocabularyCards";
import WordsList from "../WordsList/WordsList";
import BuildWordGameStatistic from "./GameStatistic/BuildWordGameStatistic";
import QuizlGameStatistic from "./GameStatistic/QuizlGameStatistic";
import TranslateWordGameStatistic from "./GameStatistic/TranslateWordGameStatistic";
import { useState, useEffect } from "react";
import useVocabularyBlockQueriesApi from "../../ThereGame.Api/Queries/VocabularyBlockQueriesApi";
import IStudentVocabularyBlockModel from "../../ThereGame.Business/Models/IStudentVocabularyBlock";


export interface IVocabularyBlockTabsProps {
    studentId: string;
    onEditCard: (id: string) => void;
    onCreateNewWord: () => void;
    selectedVcabularyBlock: IStudentVocabularyBlockModel;
}

export default function VocabularyBlock(props: IVocabularyBlockTabsProps) {


    const vocabularyBlockQueriesApi = useVocabularyBlockQueriesApi();


    const [selectedVcabularyBlockId, setSelectedVocabularyBlockId] = useState<string>("")
    const [playedGamesDate, setPlayedGamesdDate] = useState<Date[]>([]);

    const [selectedStartDate, setSelecetedStartDate] = useState<Date>(new Date());
    const [selectedEndDate, setSelecetedEndDate] = useState<Date>(new Date());

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onDeleteBlock = async () => {
        await vocabularyBlockQueriesApi.delete(props.selectedVcabularyBlock.id, props.studentId);
    }

    const onUpdateVocabularyBlock = async (wordId?: string, name?: string) => {

        if (!props.selectedVcabularyBlock) {
            return;
        }

        var wordsId = [...props.selectedVcabularyBlock.wordsId]
        if (!!wordId && wordsId.includes(wordId)) {

            wordsId = wordsId.filter(id => id != wordId);
        }
        else if (!!wordId) {
            wordsId.push(wordId);
        }

        var updatedVocabularyBlock: IStudentVocabularyBlockModel = {
            id: props.selectedVcabularyBlock.id,
            studentId: props.selectedVcabularyBlock.studentId,
            name: name ?? props.selectedVcabularyBlock.name,
            wordsId: wordsId,
            createdAt: props.selectedVcabularyBlock.createdAt,
            quizlGameStatistics: props.selectedVcabularyBlock.quizlGameStatistics,
            translateWordsGameStatistics: props.selectedVcabularyBlock.translateWordsGameStatistics,
            buildWordsGameStatistics: props.selectedVcabularyBlock.buildWordsGameStatistics,
        }

        await vocabularyBlockQueriesApi.update(updatedVocabularyBlock);
    }

    const deleteStudentCard = (id: string) => {
        onUpdateVocabularyBlock(id);
    }

    // UseEffects

    useEffect(() => {
        if (!props.selectedVcabularyBlock) {
            return;
        }

        const quizlPlayedDays = props.selectedVcabularyBlock.quizlGameStatistics.map(statistic => statistic.createdAt);
        const buildWordPlayedDays = props.selectedVcabularyBlock.buildWordsGameStatistics.map(statistic => statistic.createdAt);
        const translatedWordPlayedDays = props.selectedVcabularyBlock.translateWordsGameStatistics.map(statistic => statistic.createdAt);

        const playedGamesDate = [...quizlPlayedDays, ...buildWordPlayedDays, ...translatedWordPlayedDays]

        setPlayedGamesdDate(playedGamesDate);

    }, [props.selectedVcabularyBlock])

    return (
        <Box  sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box display='flex' justifyContent='flex-end' width='100%' marginRight={15}>
                <StudentCalendarActivity onChange={setSelecetedStartDate} highlightDates={playedGamesDate} date={selectedStartDate} label="Start date" />
                <StudentCalendarActivity onChange={setSelecetedEndDate} highlightDates={playedGamesDate} date={selectedEndDate} label="End date" />
            </Box>

            <Box display='flex'>
                <QuizlGameStatistic
                    quizlGameStatistics={
                        props.selectedVcabularyBlock?.quizlGameStatistics
                            .filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
                <BuildWordGameStatistic
                    buildWordGamesStatistics={
                        props.selectedVcabularyBlock?.buildWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
                <TranslateWordGameStatistic
                    translateWordGamesStatistics={props.selectedVcabularyBlock?.translateWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                />
            </Box>

            <VocabularyCards
                wordsId={props.selectedVcabularyBlock?.wordsId ?? []}
                quizlGamesStatistics={props.selectedVcabularyBlock?.quizlGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                buildWordsGameStatistic={props.selectedVcabularyBlock?.buildWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                translateWordsGameStatistic={props.selectedVcabularyBlock?.translateWordsGameStatistics.filter(statistic => isOnRange(statistic.createdAt, selectedStartDate, selectedEndDate)) ?? []}
                onEditCard={props.onEditCard}
                onDeleteCard={deleteStudentCard}
                onDeleteBlock={onDeleteBlock}
            />

            <Box sx={{ width: "90%", mr: 10 }}>
                <WordsList onSelectWord={props.onEditCard} onAddWord={onUpdateVocabularyBlock} onCreateNewWord={props.onCreateNewWord} />
            </Box>
        </Box>
    )
}