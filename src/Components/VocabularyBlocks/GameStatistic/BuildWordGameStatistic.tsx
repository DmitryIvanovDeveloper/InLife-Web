import { Grid, Typography, IconButton, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery, useTheme } from "@mui/material";
import IBuildWordsGameStatistic from "../../../ThereGame.Business/Models/IBuildWordsGameStatistic";
import { useState, useEffect } from "react";
import BuildWordGameTable from "../../BuildWordStatisticTable/BuildWordStatisticTable";
import ExtensionIcon from '@mui/icons-material/Extension';

export interface IBuildWordGameStatisticProps {
    buildWordGamesStatistics: IBuildWordsGameStatistic[];
}

export default function BuildWordGameStatistic(props: IBuildWordGameStatisticProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const [correctAnswers, setCorrectAnswera] = useState<number>(0);
    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);

    useEffect(() => {
        let numCorrectAnswers = 0;

        props.buildWordGamesStatistics.forEach(statistic => {

            statistic.answers.forEach(answer => {
                const parsedAnswer = JSON.parse(answer);
                if (parsedAnswer.IsCorrect === true) {
                    numCorrectAnswers++;
                }
            });
        });

        setCorrectAnswera(numCorrectAnswers);

    }, [props.buildWordGamesStatistics]);

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
                        <BuildWordGameTable buildWordsGameStatistics={props.buildWordGamesStatistics ?? []} />
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
            <Typography>Build Words</Typography>
        </Grid>

        <Grid container alignItems='center'  justifyContent='center'>

            <Grid item >
                <IconButton onClick={() => setIsOpenStatisticTable(true)}>
                    <ExtensionIcon />
                </IconButton>
            </Grid>

            <Grid item >
                <Typography >{props.buildWordGamesStatistics.length}</Typography>
            </Grid>

            <Grid item display='flex'>
                <Typography sx={{ ml: 0.5 }}>{`(`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='red'>{props.buildWordGamesStatistics.length - correctAnswers}</Typography>
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