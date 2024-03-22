import { Box, Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useWordsState } from "../../Data/useWords";
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel"
import { useEffect, useState } from "react";
import { SpeechPart } from "../../ThereGame.Business/Models/SpeechPart";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import IQuizleWordModel from "../../ThereGame.Business/Models/IQuizleWordModel";
import { isDateSame } from "../../ThereGame.Infrastructure/Helpers/DatesCompare";


export interface ITable {
    date: Date;
    quzleWords: IQuizlWordModel[];
    answers: string[];
}

export interface IVocabularyBlockStatisticProps {
    quizleGame: IQuizleGameModel
    quizlGameStatistics: IQuizleGameStatisticModel[]
    selectedDate: Date;
}

export default function VocabularyBlockStatistic(props: IVocabularyBlockStatisticProps) {
    const [wordsState] = useWordsState();
    const [quizleWords, setQuizleWord] = useState<IQuizlWordModel[]>([]);

    const [data, setData] = useState<ITable[]>([]);

    useEffect(() => {

        var data: ITable[] = props.quizlGameStatistics
            .filter(statistic => isDateSame(statistic.createdAt, props.selectedDate))
            .filter(statistic => statistic.quizlGameId)
            .map(statistic => {
                var tableData: ITable = {
                    date: statistic.createdAt,
                    quzleWords: quizleWords,
                    answers: statistic.answers,
                }
            return tableData;
        });

        setData(data);
    }, [props.quizleGame, props.quizlGameStatistics, props.selectedDate]);



    useEffect(() => {
        var expectedWord = wordsState.find(ws => ws.id == props.quizleGame.hiddenWordId);
        if (!expectedWord) {
            return;
        }

        var data: IQuizlWordModel[] = JSON.parse(props.quizleGame.data);
        setQuizleWord(data);
    }, [props.quizleGame, props.quizlGameStatistics]);

    
    return (
        <TableBody sx={{ height: "60px", overflow: 'auto'}}>
            {data.map((row) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {new Date(row.date).toDateString()}
                    </TableCell>

                    <TableCell align="right">
                        <Box display='flex'>
                            {row?.quzleWords.map(word => (
                                <Typography color={word.isHidden ? "green" : 'balck'} sx={{ m: 0.2 }}>{word.word}</Typography>
                            ))}
                        </Box>
                    </TableCell>

                    <TableCell align="right">{row?.answers.join()}</TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">1</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}