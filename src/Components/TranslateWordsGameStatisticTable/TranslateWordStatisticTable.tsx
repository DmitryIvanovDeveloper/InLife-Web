import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material"
import ITranslateWordsGameStatistic from "../../ThereGame.Business/Models/ITranslateWordsGameStatistic"
import { useEffect, useState } from "react"
import { useWordsState } from "../../Data/useWords"
import { isDateSame } from "../../ThereGame.Infrastructure/Helpers/DatesCompare"
import WordModel from "../../ThereGame.Business/Models/IWordModel"


export interface ICompactStatistic{
    word: WordModel | undefined;
    data: IAnswersData[]
    hasCorrect: number,
    hasUncorrect: number,
}


export interface IAnswersData {
    answers: string[],
    hasCorrect: number,
    hasUncorrect: number,
}


export interface ITranslateWordGameTableProps {
    translateWordsGameStatistics: ITranslateWordsGameStatistic[]
    selectedDate: Date;
}

export default function TranslateWordGameTable(props: ITranslateWordGameTableProps) {

    const [wordsState] = useWordsState();

    const [compactStatistics, setCompactStatistic] = useState<ICompactStatistic[]>([]);


    useEffect(() => {
        
        //TODO: Refactoring
        const uniqueWordsGameIds = [...new Set(props.translateWordsGameStatistics
            .filter(statistic => isDateSame(statistic.createdAt, props.selectedDate))
            .map(item => item.wordId))]

        var compactStatistics: ICompactStatistic[] = uniqueWordsGameIds.map(uniqueWordId => {


            var expectedStatissticsByWordId = props.translateWordsGameStatistics
                .filter(statistic => statistic.wordId == uniqueWordId)
            ;

            var expectedWord = wordsState.find(words => words.id == uniqueWordId);


            const tableData: IAnswersData[] = expectedStatissticsByWordId.map(statistic => {
                var matches = statistic.answers.filter(answer => answer.toLocaleLowerCase().includes(expectedWord?.word.toLowerCase() ?? ''));
                
                const correctAnswers = matches?.length ?? 0;
                const answersLength = statistic?.answers.length

                return {
                    answers: statistic.answers,
                    hasCorrect: correctAnswers,
                    hasUncorrect:  answersLength - correctAnswers
                }
            })

            var allCorrectAnswers = 0
            var allUncorrectAnswers = 0

            tableData.forEach(element => {
                allCorrectAnswers = element.hasCorrect + allCorrectAnswers;
                allUncorrectAnswers = element.hasUncorrect + allUncorrectAnswers;
            });

            const compactStatistic: ICompactStatistic = {
                word: expectedWord,
                data: tableData,
                hasCorrect: allCorrectAnswers,
                hasUncorrect: allUncorrectAnswers,
            }
            return compactStatistic
        })

        setCompactStatistic(compactStatistics);
    }, [props]);
    
    return (
        <Box width='100%' display='flex' justifyContent='center'>
        <Paper sx={{ height: '400px', overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{ width: 800 }}>

                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Word</TableCell>
                            <TableCell align="right">Answers</TableCell>
                            <TableCell align="right">Correct</TableCell>
                            <TableCell align="right">Uncorrect</TableCell>
                        </TableRow>
                    </TableHead>

                    {compactStatistics.map(compactStatistic => (
                         <TableBody sx={{ height: "60px", overflow: 'auto' }}>
                         <TableRow
                            //  key={uuidv4()}
                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                         >
                             <TableCell align="right">
                                    <Typography  sx={{ m: 0.2 }}>{compactStatistic.word?.wordTranslates[0].translates[0]}</Typography>
                             </TableCell>
         
                             <TableCell align="right">
                                {compactStatistic?.data?.map(data => (
                                    <Typography>{data.answers.join()}</Typography>
                                ))}
                             </TableCell>
         
                             <TableCell align="right">{compactStatistic.hasCorrect}</TableCell>
                             <TableCell align="right">{compactStatistic.hasUncorrect}</TableCell>
                         </TableRow>
                 </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </Paper>
    </Box>

    )
}