import { Box, Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useWordsState } from "../../Data/useWords";
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel"
import { useEffect, useState } from "react";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import { v4 as uuidv4 } from 'uuid';


export interface ITable {
    quzleWords: IQuizlWordModel[];
    answers: string[];
}

export interface ICompactStatisticData {
    statisticId: string;
    answers: string[];
}

export interface IVocabularyBlockStatisticProps {
    quizleGame: IQuizleGameModel
    quizlGameStatistics: IQuizleGameStatisticModel[]
    selectedDate: Date;
}



export default function QuizleGameStatisticTableData(props: IVocabularyBlockStatisticProps) {
    const [wordsState] = useWordsState();

    const [data, setData] = useState<ITable>();

    useEffect(() => {

        const playedGameAnswers = props.quizlGameStatistics
            .filter(statistic => statistic.quizlGameId == props.quizleGame.id)
            .map((statistic) => statistic.answers)
            .flat()
        ;

        var expectedWord = wordsState.find(ws => ws.id == props.quizleGame.hiddenWordId);
        if (!expectedWord) {
            return;
        }


        const table: ITable = {
            quzleWords: JSON.parse(props.quizleGame.data),
            answers: playedGameAnswers
        }

        setData(table);
           
    }, [props.quizleGame, props.quizlGameStatistics, props.selectedDate]);



    return (
        <TableBody sx={{ height: "60px", overflow: 'auto' }}>
                <TableRow
                    key={uuidv4()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {/* {new Date(row.date).toDateString()} */}
                    </TableCell>

                    <TableCell align="right">
                        <Box display='flex'>
                            {data?.quzleWords.map(word => (
                                <Typography color={word.isHidden ? "green" : 'balck'} sx={{ m: 0.2 }}>{word.word}</Typography>
                            ))}
                        </Box>
                    </TableCell>

                    <TableCell align="right">{data?.answers?.reverse().map(answer => (
                        <Typography>{answer}</Typography>
                    ))}</TableCell>

                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">1</TableCell>
                </TableRow>
        </TableBody>
    )
}