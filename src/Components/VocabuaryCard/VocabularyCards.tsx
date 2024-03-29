import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, List, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import WordsList from "../WordsList/WordsList";
import { useEffect, useState } from "react";
import { useWordsState } from "../../Data/useWords";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";

import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import QuizlGameStatisticTable from "../QuizleGameStatisticTable/QuizlGameStatisticTable";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IBuildWordsGameStatistic from "../../ThereGame.Business/Models/IBuildWordsGameStatistic";
import VocabularyCardQuizGameStaistics from "./VocabularyCardQuizlGameStatistic";
import VocabularyCardBuildWordGamesStatistic from "./VocabularyCardBuildWordGamesStatistic";
import VocabularyCardTranslateWordGameStatistic from "./VocabularyCardTranslateWordGameStatistic";
import ITranslateWordsGameStatistic from "../../ThereGame.Business/Models/ITranslateWordsGameStatistic";
import Draggable from "react-draggable";
import VocabularyCard from "./VocabularyCard";
import PopupSettings from "./PopupSettings";


// export interface IVocabularyCardProps {
//     onEditCard: (id: string) => void;
//     onUpdateVocabularyBlock: (id: string) => void;
//     setIsCreateCard: () => void;
//     cards: ICard[];
//     onDeleteCard: (id: string) => void;
// }

export interface IVocabularyCardProps {
    wordsId: string[];
    quizlGamesStatistics: IQuizleGameStatisticModel[];
    buildWordsGameStatistic: IBuildWordsGameStatistic[]
    translateWordsGameStatistic: ITranslateWordsGameStatistic[];
    onEditCard: (id: string) => void;
    onDeleteCard: (id: string) => void;
    onDeleteBlock: () => void;
}

export default function VocabularyCards(props: IVocabularyCardProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const [isOpenStatisticTable, setIsOpenStatisticTable] = useState<boolean>(false);
    const [isShowCardStatistics, setIsShowCardStatistics] = useState<boolean>(false);
    const [wordsState] = useWordsState();

    const [vocabularyWords, setVocabularyWords] = useState<IWordModel[]>([]);
    const [quizlGamesBySpecificWord, setQuizlGamesBySpecificWords] = useState<IQuizleGameStatisticModel[]>([]);

    useEffect(() => {
        const expectedWords = wordsState.filter(word => props.wordsId.includes(word.id));
        setVocabularyWords(expectedWords);
    }, [props, isShowCardStatistics]);


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
                        <QuizlGameStatisticTable quizlGameStatistics={quizlGamesBySpecificWord} />
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

        <Box display='flex' justifyContent='flex-start'>

            {isOpenStatisticTable
                ? Modal()
                : null
            }

            <Box display='flex' width='1500px' flexDirection='column' justifyContent='flex--start' sx={{ backgroundColor: '#00897b', borderRadius: "10px", overflow: 'auto', height: '50vh', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                
                <PopupSettings onDelete={props.onDeleteBlock} />

                <Box display='flex' justifyContent='space-between'>
                    <Typography sx={{ml: 1}} color='white' fontWeight={600}>{`Cards (${vocabularyWords.length})`}</Typography>
                    <FormControlLabel
                        labelPlacement="top"
                        control={
                            <Switch checked={isShowCardStatistics} onChange={(event) => setIsShowCardStatistics(event.target.checked)}></Switch>
                        }
                        label={<Typography color='white' fontWeight={600}>Show card statistics</Typography>}
                    />
                </Box>
                <Grid container justifyContent='center' width='100%' sx={{ overflow: 'auto' }} >
                    {vocabularyWords.map((word, index) => (
                        <VocabularyCard
                            onEditCard={props.onEditCard}
                            onDeleteCard={props.onDeleteCard}
                            quizlGamesStatistics={props.quizlGamesStatistics}
                            buildWordsGameStatistic={props.buildWordsGameStatistic}
                            translateWordsGameStatistic={props.translateWordsGameStatistic}
                            isShowCardStatistics={isShowCardStatistics}
                            word={word} 
                        />
                    ))}
                </Grid>
            </Box>

        </Box>

    )
}