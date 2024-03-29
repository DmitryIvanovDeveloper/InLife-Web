import { Grid, Typography, IconButton, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery, useTheme, Card, CardActionArea } from "@mui/material";
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
    const [uncorrectAnswers, setUncorrectAnswera] = useState<number>(0);

    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);

    useEffect(() => {
        let numCorrectAnswers = 0;
        let uncorrectAnswers = 0;

        props.buildWordGamesStatistics.forEach(statistic => {

            statistic.answers.forEach(answer => {
                const parsedAnswer = JSON.parse(answer);
                if (parsedAnswer.IsCorrect === true) {
                    numCorrectAnswers++;
                }
                else {
                    uncorrectAnswers++;
                }
            });
        });

        setCorrectAnswera(numCorrectAnswers);
        setUncorrectAnswera(uncorrectAnswers);
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
        <Card sx={{ width: '350px', m: 1 }}>
            {isOpenStatisticTable
                ? Modal()
                : null
            }
            <CardActionArea onClick={() => setIsOpenStatisticTable(true)}>

                <Grid container alignItems='center' justifyContent='center'>

                    <Grid item >
                        <Typography>Build Words</Typography>
                    </Grid>

                    <Grid container alignItems='center' justifyContent='center'>

                        <Grid item >
                            <ExtensionIcon />
                        </Grid>

                        <Grid item >
                            <Typography fontWeight={600} sx={{ ml: 1 }}>{props.buildWordGamesStatistics.length}</Typography>
                        </Grid>

                        <Grid item display='flex'>
                            <Typography sx={{ ml: 0.5 }}>{`(`}</Typography>
                            <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                            <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                            <Typography sx={{ ml: 0.5 }} color='red'>{uncorrectAnswers}</Typography>
                            <Typography sx={{ ml: 0.5 }}>{`)`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    )
}