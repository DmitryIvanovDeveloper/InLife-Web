import { Box, Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel"
import { useEffect, useState } from "react";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import { v4 as uuidv4 } from 'uuid';
import React from "react";


const defaultData: ITable = {
    quizlWords: [],
    answers: [],
    hasCorrect: 0,
    hasUncorrect: 0,
}
export interface ITable {
    quizlWords: IQuizlWordModel[];
    answers: string[];
    hasCorrect: number;
    hasUncorrect: number;
}

export interface ICompactStatisticData {
    statisticId: string;
    answers: string[];
}

export interface IVocabularyBlockStatisticProps {
    quizleGame: IQuizleGameModel
    quizlGameStatistics: IQuizleGameStatisticModel[]
}

export default function QuizleGameStatisticTableData(props: IVocabularyBlockStatisticProps) {
    const [data, setData] = useState<ITable>(defaultData);

    useEffect(() => {
        const playedGameStatisticAnswersByQuizlGameId = props.quizlGameStatistics
            .filter(statistic => statistic.quizlGameId == props.quizleGame.id)
            .map((statistic) => statistic.answers)
            .flat()
        ;

        var quizlWords: IQuizlWordModel[] =  JSON.parse(props.quizleGame.data);

        var hiddenWord = quizlWords.find(q => q.isHidden)

        var matches = playedGameStatisticAnswersByQuizlGameId.filter(answer => JSON.parse(answer).Answer == hiddenWord?.word);
                
        const correctAnswers = matches?.length ?? 0;

        const answersLength = playedGameStatisticAnswersByQuizlGameId.length;

        const table: ITable = {
            quizlWords: quizlWords,
            answers: playedGameStatisticAnswersByQuizlGameId,
            hasCorrect: correctAnswers,
            hasUncorrect: answersLength - correctAnswers
        }

        setData(table);

           
    }, [props.quizleGame, props.quizlGameStatistics]);



    return (
        <TableBody sx={{ height: "60px", overflow: 'auto' }}>
                <TableRow
                    key={uuidv4()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell >
                        <Box display='flex'>
                            {data?.quizlWords.map(word => (
                                <Typography color={word.isHidden ? "green" : 'balck'} sx={{ m: 0.2 }}>{word.word}</Typography>
                            ))}
                        </Box>
                    </TableCell>

                    <TableCell>{data?.answers.map(answer => (
                        <Typography>{JSON.parse(answer).Answer}</Typography>
                    ))}</TableCell>

                    <TableCell >{data?.hasCorrect}</TableCell>
                    <TableCell >{data?.hasUncorrect}</TableCell>
                </TableRow>
        </TableBody>
    )
}