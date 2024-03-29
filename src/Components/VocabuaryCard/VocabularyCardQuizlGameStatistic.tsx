import { Dialog, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Button, IconButton, Typography, Grid } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import { IQuizleGameStatisticDto } from "../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto"
import QuizlGameStatisticTable from "../QuizleGameStatisticTable/QuizlGameStatisticTable";

export interface IVocabilaryCardQuizlGameStatistic {
    quizlGamesStatistic: IQuizleGameStatisticDto[];
    wordQuizlGamesId: string[];
}

export default function VocabularyCardQuizGameStaistics(props: IVocabilaryCardQuizlGameStatistic) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const quizlQueriesApi = useQuizlQueriesApi();

    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);
    const [quizlGamesBySpecificWord, setQuizlGamesBySpecificWords] = useState<IQuizleGameStatisticModel[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [unCorrectAnswers, setUncorrectAnswers] = useState<number>(0);

    const showWordStatistic = async (wordsQuizlGamesId: string[]) => {
        setIsOpenStatisticTable(true);

        var wordsQuizlGames = await quizlQueriesApi.get(wordsQuizlGamesId);


    }


    useEffect(() => {
        let numCorrectAnswers = 0;
        let numUncorrectAnswers = 0;

        quizlGamesBySpecificWord.forEach(statistic => {
            statistic.answers.forEach(answer => {
                const parsedAnswer = JSON.parse(answer);
                if (parsedAnswer.IsCorrect === true) {
                    numCorrectAnswers++;
                }
                else {
                    numUncorrectAnswers++;
                }
            });
        });

        setUncorrectAnswers(numUncorrectAnswers);
        setCorrectAnswers(numCorrectAnswers);

    }, [props]);



    useEffect(() => {
        const wordStatistic = props.quizlGamesStatistic
            .filter(quizlGameStatistic => props.wordQuizlGamesId.find(qg => qg == quizlGameStatistic.quizlGameId));

        setQuizlGamesBySpecificWords(wordStatistic);

    }, [props.quizlGamesStatistic]);


    interface ICardQuizleGameTableProps {
        wordQuizlGamesId: string[];
    }

    function CardQuizleGameTable(props: ICardQuizleGameTableProps): ReactElement {
        const [quizleGamesStatistic, setQuizlGamesStatistic] = useState<IQuizleGameStatisticModel[]>([])
        setIsOpenStatisticTable(true);
        
        useEffect(() => {
            quizlQueriesApi.get(props.wordQuizlGamesId)
            .then(quizleGamesByWord => {
                var statistic = quizlGamesBySpecificWord.filter(statistic => quizleGamesByWord.find(qg => qg.id == statistic.quizlGameId))
                setQuizlGamesStatistic(statistic);
            })

        }, []);
        
        return (
            <Dialog
                fullScreen={fullScreen}
                open={isOpenStatisticTable}
                onClose={() => setIsOpenStatisticTable(false)}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "900px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogContent >
                    <DialogContentText>
                        <QuizlGameStatisticTable quizlGameStatistics={quizleGamesStatistic} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenStatisticTable(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }



    return (
        <Grid container  flexDirection='column' alignItems='center'>
            <Grid item>
                <IconButton onClick={() => showWordStatistic(props.wordQuizlGamesId)}>
                    <Typography fontWeight={600}>Quizl</Typography>
                </IconButton>
            </Grid>
            <Grid item display='flex'>
                <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='red'>{unCorrectAnswers}</Typography>
            </Grid>

            {isOpenStatisticTable
                ?   <CardQuizleGameTable wordQuizlGamesId={props.wordQuizlGamesId}/>
                : null
            }
        </Grid>
    )
}