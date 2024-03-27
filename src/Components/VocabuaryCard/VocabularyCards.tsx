import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, FormControlLabel, Grid, IconButton, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import WordsList from "../WordsList/WordsList";
import { useEffect, useState } from "react";
import { useWordsState } from "../../Data/useWords";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";
import DeleteIcon from '@mui/icons-material/DeleteOutlineSharp';
import EditIcon from '@mui/icons-material/Edit';
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import QuizlGameStatisticTable from "../QuizleGameStatisticTable/QuizlGameStatisticTable";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IBuildWordsGameStatistic from "../../ThereGame.Business/Models/IBuildWordsGameStatistic";
import VocabularyCardQuizGameStaistics from "./VocabularyCardQuizlGameStatistic";
import VocabularyCardBuildWordGamesStatistic from "./VocabularyCardBuildWordGamesStatistic";
import VocabularyCardTranslateWordGameStatistic from "./VocabularyCardTranslateWordGameStatistic";
import ITranslateWordsGameStatistic from "../../ThereGame.Business/Models/ITranslateWordsGameStatistic";


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
        <Box width='100%'>

            {isOpenStatisticTable
                ? Modal()
                : null
            }

            <Box display='flex' justifyContent='flex-end' marginRight={10}>
                <FormControlLabel
                    labelPlacement="top"
                    control={
                        <Switch checked={isShowCardStatistics} onChange={(event) => setIsShowCardStatistics(event.target.checked)}></Switch>
                    }
                    label="Show card statistics"
                />
            </Box>
            <Box display='flex' justifyContent='center' width='100%'>

                <Grid container width='100%' sx={{ ml: 10, mr: 10 }} >

                    {vocabularyWords.map((word, index) => (
                        <Grid item sx={{ m: 1 }}>
                            <Box height="0px">

                                {!isShowCardStatistics
                                    ? <Box sx={{ m: 0, display: 'flex', justifyContent: 'space-between' }}>
                                        <IconButton onClick={() => props.onEditCard(word.id)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton  onClick={() => props.onDeleteCard(word.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                     
                                    </Box>
                                    : <Grid container justifyContent='space-around' >
                                        <Grid item>
                                            <VocabularyCardQuizGameStaistics
                                                quizlGamesStatistic={props.quizlGamesStatistics}
                                                wordQuizlGamesId={word.quizlGamesId}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <VocabularyCardBuildWordGamesStatistic
                                                buildWordsGameStatistic={props.buildWordsGameStatistic}
                                                wordId={word.id}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <VocabularyCardTranslateWordGameStatistic
                                                translateWordsGameStatistic={props.translateWordsGameStatistic}
                                                wordId={word.id}
                                            />
                                        </Grid>
                                    </Grid>
                                }
                            </Box>
                            <Card sx={{
                                m: 0,
                                p: 0,
                                width: 300,
                                height: 200,
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                <Typography position='relative' color={'Dark Gray'} fontWeight={600} variant="h5">{word.word}</Typography>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </Box>

    )
}