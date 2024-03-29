import { Dialog, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Button, IconButton, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ExtensionIcon from '@mui/icons-material/Extension';
import ITranslateWordsGameStatistic from "../../ThereGame.Business/Models/ITranslateWordsGameStatistic";
import TranslateWordGameTable from "../TranslateWordsGameStatisticTable/TranslateWordStatisticTable";
import TranslateIcon from '@mui/icons-material/Translate';

export interface IVocabularyCardTranslateWordGameStatisticProps {
    translateWordsGameStatistic: ITranslateWordsGameStatistic[];
    wordId: string;
}

export default function VocabularyCardTranslateWordGameStatistic(props: IVocabularyCardTranslateWordGameStatisticProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);
    const [translateWordGamesBySpecificWord, setBuildWordGamesBySpecificWords] = useState<ITranslateWordsGameStatistic[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [unCorrectAnswers, setUncorrectAnswers] = useState<number>(0);


    useEffect(() => {
        const wordGameStatistic = props.translateWordsGameStatistic.filter(statistic => statistic.wordId == props.wordId);
        setBuildWordGamesBySpecificWords(wordGameStatistic);
    }, [props]);


    useEffect(() => {
        let numCorrectAnswers = 0;
        let numUncorrectAnswers = 0;

        translateWordGamesBySpecificWord.forEach(statistic => {
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

    function CardQuizleGameTable() {
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
                        <TranslateWordGameTable translateWordsGameStatistics={translateWordGamesBySpecificWord} />
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
        <Grid container flexDirection='column' alignItems='center'>
            <Grid item>
                <IconButton onClick={() => setIsOpenStatisticTable(true)}>
                    <TranslateIcon />
                </IconButton>
            </Grid>
            <Grid item display='flex'>
                <Typography sx={{ ml: 0.5 }} color='green'>{correctAnswers}</Typography>
                <Typography sx={{ ml: 0.5 }}>{`/`}</Typography>
                <Typography sx={{ ml: 0.5 }} color='red'>{unCorrectAnswers}</Typography>
            </Grid>

            {isOpenStatisticTable
                ? <CardQuizleGameTable />
                : null
            }
        </Grid>
    )
}