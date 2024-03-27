import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import IQuizleGameModel from "../../ThereGame.Business/Models/IQuizleWordModel";
import QuizleGameStatisticTableData from "./QuizleGameStatisticTableData";

export interface IVocabularyBlockStatisticsProps {
    quizlGameStatistics: IQuizleGameStatisticModel[];
}


export default function QuizlGameStatisticTable(props: IVocabularyBlockStatisticsProps) {
    const quizlQueriesApi = useQuizlQueriesApi();

    const [quizleGames, setQuizleGames] = useState<IQuizleGameModel[]>([]);

    useEffect(() => {

        if (!props.quizlGameStatistics.length) {
            return;
        }

        const uniqueQuizlGameIds = [
            ...new Set(props.quizlGameStatistics
                .map(item => item.quizlGameId))
            ];
        
        if (!uniqueQuizlGameIds.length) {
            setQuizleGames([]);
            return;
        }
        
        quizlQueriesApi.get(uniqueQuizlGameIds)
            .then(result => {
                setQuizleGames(result);
            })
        ;

    }, [props.quizlGameStatistics]);

    return (
        <Box width='100%' display='flex' justifyContent='center'>
            <Paper sx={{ height: '400px', overflow: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" sx={{ width: 800 }}>

                        <TableHead>
                            <TableRow>
                                <TableCell>Exercise</TableCell>
                                <TableCell>Answers</TableCell>
                                <TableCell>Correct</TableCell>
                                <TableCell>Uncorrect</TableCell>
                            </TableRow>
                        </TableHead>
                        {quizleGames.map(quizleGame => (
                            <QuizleGameStatisticTableData
                                quizleGame={quizleGame}
                                quizlGameStatistics={props.quizlGameStatistics}
                            />
                        ))}

                    </Table>
                </TableContainer>
            </Paper>
        </Box>

    )
}