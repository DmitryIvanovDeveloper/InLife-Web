import { Box, Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useWordsState } from "../../Data/useWords";
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel"
import { useEffect, useState } from "react";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import { v4 as uuidv4 } from 'uuid';
import { isDateSame } from "../../ThereGame.Infrastructure/Helpers/DatesCompare";


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
    selectedDate: Date;
}



export default function QuizleGameStatisticTableData(props: IVocabularyBlockStatisticProps) {
    const [wordsState] = useWordsState();

    const [data, setData] = useState<ITable>(defaultData);

    useEffect(() => {

        const statisticBtDate = props.quizlGameStatistics.filter(statistic => isDateSame(statistic.createdAt, props.selectedDate));
        if (!statisticBtDate.length) {
            setData(defaultData);
            return;
        }
        const playedGameAnswers = props.quizlGameStatistics
            .filter(statistic => statistic.quizlGameId == props.quizleGame.id)
            .map((statistic) => statistic.answers)
            .flat()
        ;

        var expectedWord = wordsState.find(ws => ws.id == props.quizleGame.hiddenWordId);
        if (!expectedWord) {
            return;
        }

        var quizlWords: IQuizlWordModel[] =  JSON.parse(props.quizleGame.data);

        var hiddenWord = quizlWords.find(q => q.isHidden)

        var matches = playedGameAnswers.filter(answer => answer == hiddenWord?.word);
                
        const correctAnswers = matches?.length ?? 0;
        const answersLength = playedGameAnswers.length;

        const table: ITable = {
            quizlWords: quizlWords,
            answers: playedGameAnswers,
            hasCorrect: correctAnswers,
            hasUncorrect: answersLength - correctAnswers
        }

        setData(table);

           
    }, [props.quizleGame, props.quizlGameStatistics, props.selectedDate]);



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
                        <Typography>{answer}</Typography>
                    ))}</TableCell>

                    <TableCell >{data?.hasCorrect}</TableCell>
                    <TableCell >{data?.hasUncorrect}</TableCell>
                </TableRow>
        </TableBody>
    )
}