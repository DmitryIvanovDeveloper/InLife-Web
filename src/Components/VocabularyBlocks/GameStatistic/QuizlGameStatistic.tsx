import ExtensionIcon from '@mui/icons-material/Extension';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import IQuizleGameStatisticModel from '../../../ThereGame.Business/Models/IQuizleGameStatistic';
import { useEffect, useState } from 'react';
import QuizlGameStatisticTable from '../../QuizleGameStatisticTable/QuizlGameStatisticTable';

export interface IQuizlGameStatisticProps {
    quizlGameStatistics: IQuizleGameStatisticModel[]
}

export default function QuizlGameStatistic(props: IQuizlGameStatisticProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const [correctAnswers, setCorrectAnswera] = useState<number>(0);
    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);

    useEffect(() => {
        let numCorrectAnswers = 0;
        props.quizlGameStatistics.forEach(statistic => {
            statistic.answers.forEach(answer => {
                const parsedAnswer = JSON.parse(answer);
                if (parsedAnswer.IsCorrect === true) {
                    numCorrectAnswers++;
                }
            });
        });

        setCorrectAnswera(numCorrectAnswers);

    }, [props.quizlGameStatistics]);

    function Modal() {
      
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
                        <QuizlGameStatisticTable quizlGameStatistics={props.quizlGameStatistics ?? []} />
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
        <Grid container alignItems='center' justifyContent='center'>
            <Grid item >
                <Typography >Quizl Game</Typography>
            </Grid>
            <Grid container alignItems='center'  justifyContent='center' >

                <Grid item >
                    <IconButton onClick={() => setIsOpenStatisticTable(true)}>
                        <Typography fontWeight={600}>Quizl</Typography>
                    </IconButton>
                </Grid>

                <Grid item >
                    <Typography fontWeight={600}>{props.quizlGameStatistics.length}</Typography>
                </Grid>

                <Grid item display='flex'>
                    <Typography sx={{ ml: 0.5 }}>{`(`}</Typography>
                    <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                    <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                    <Typography sx={{ ml: 0.5 }} color='red'>{props.quizlGameStatistics.length - correctAnswers}</Typography>
                    <Typography sx={{ ml: 0.5 }}>{`)`}</Typography>
                </Grid>
            </Grid>

            {isOpenStatisticTable
                ? Modal()
                : null
        }
        </Grid>
    )
}