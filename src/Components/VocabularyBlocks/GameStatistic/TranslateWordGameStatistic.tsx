import { Grid, Typography, IconButton, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery, useTheme } from "@mui/material";
import IBuildWordsGameStatistic from "../../../ThereGame.Business/Models/IBuildWordsGameStatistic";
import { useState, useEffect } from "react";
import TranslateIcon from '@mui/icons-material/Translate';
import TranslateWordGameTable from "../../TranslateWordsGameStatisticTable/TranslateWordStatisticTable";

export interface ITranslateWordGameStatisticProps {
    translateWordGamesStatistics: IBuildWordsGameStatistic[];
}

export default function TranslateWordGameStatistic(props: ITranslateWordGameStatisticProps) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const [correctAnswers, setCorrectAnswera] = useState<number>(0);
    const [uncorrectAnswers, setUncorrectAnswer] = useState<number>(0);
    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);

    useEffect(() => {
        let numCorrectAnswers = 0;
        let numUncorrectAnswers = 0;

        props.translateWordGamesStatistics.forEach(statistic => {
            statistic.answers.forEach(answer => {
                const parsedAnswer = JSON.parse(answer);
                if (parsedAnswer.IsCorrect === true) {
                    numCorrectAnswers++;
                }
                else {
                    numUncorrectAnswers++
                }
            });
        });

        setCorrectAnswera(numCorrectAnswers);
        setUncorrectAnswer(numUncorrectAnswers);
    }, [props.translateWordGamesStatistics]);

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
                        <TranslateWordGameTable translateWordsGameStatistics={props.translateWordGamesStatistics ?? []} />
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
            <Typography>Translate Words</Typography>
        </Grid>

        <Grid container alignItems='center'  justifyContent='center'>

            <Grid item >
                <IconButton onClick={() => setIsOpenStatisticTable(true)}>
                    <TranslateIcon />
                </IconButton>
            </Grid>

            <Grid item >
                <Typography >{props.translateWordGamesStatistics.length}</Typography>
            </Grid>

            <Grid item display='flex'>
                <Typography sx={{ ml: 0.5 }}>{`(`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='red'>{uncorrectAnswers}</Typography>
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