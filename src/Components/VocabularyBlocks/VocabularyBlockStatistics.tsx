import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import IQuizleGameModel from "../../ThereGame.Business/Models/IQuizleWordModel";
import { useWordsState } from "../../Data/useWords";
import { SpeechPart } from "../../ThereGame.Business/Models/SpeechPart";
import VocabularyBlockStatistic from "./VocabularyBlockStatistic";
import { DayCalendarSkeleton } from "@mui/x-date-pickers";
import StudentCalendarActivity from "../Statistic/StudentDialogueStatistics/StudentCalendarActivity/StudentCalendarActivity";
import AppBarCustom from "../AppBarCustom";
import { isDateSame } from "../../ThereGame.Infrastructure/Helpers/DatesCompare";

export interface IVocabularyBlockStatisticsProps {
    quizlGameStatistics: IQuizleGameStatisticModel[];
}


export default function VocablularyBlockStatistics(props: IVocabularyBlockStatisticsProps) {
    const quizlQueriesApi = useQuizlQueriesApi();

    const [quizleGames, setQuizleGames] = useState<IQuizleGameModel[]>([]);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());


    useEffect(() => {

        if (!props.quizlGameStatistics.length) {
            return;
        }

        const uniqueQuizlGameIds = [...new Set(props.quizlGameStatistics.map(item => item.quizlGameId))]
      
        
        quizlQueriesApi.get(uniqueQuizlGameIds)
            .then(result => {
                setQuizleGames(result);
            })
        ;

    }, [props.quizlGameStatistics]);

    useEffect(() => {
        console.log(quizleGames);

    }, [quizleGames]);

    return (
        <Box width='100%' display='flex' justifyContent='center'>
            <Paper sx={{ height: '400px', overflow: 'auto' }}>
                <TableContainer component={Paper}>
            <AppBarCustom name="Quizl"/>

                    <Table aria-label="simple table" sx={{ width: 650 }}>

                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <StudentCalendarActivity 
                                        onChange={setSelectedDate} 
                                        highlightDates={props.quizlGameStatistics.map(s => s.createdAt)} 
                                        date={selectedDate}
                                />
                                </TableCell>
                                <TableCell align="right">Exercise</TableCell>
                                <TableCell align="right">Answers</TableCell>
                                <TableCell align="right">Correct</TableCell>
                                <TableCell align="right">Uncorrect</TableCell>
                            </TableRow>
                        </TableHead>
                        {quizleGames.map(quizleGame => (
                            <VocabularyBlockStatistic
                                quizleGame={quizleGame}
                                quizlGameStatistics={props.quizlGameStatistics.filter(statistic => isDateSame(statistic.createdAt, selectedDate))}
                                selectedDate={selectedDate}
                            />
                        ))}

                    </Table>
                </TableContainer>
            </Paper>
        </Box>

    )
}