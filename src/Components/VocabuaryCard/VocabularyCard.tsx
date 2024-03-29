import { Grid, Box, IconButton, Card, Typography } from "@mui/material";
import Draggable from "react-draggable";
import VocabularyCardBuildWordGamesStatistic from "./VocabularyCardBuildWordGamesStatistic";
import VocabularyCardQuizGameStaistics from "./VocabularyCardQuizlGameStatistic";
import VocabularyCardTranslateWordGameStatistic from "./VocabularyCardTranslateWordGameStatistic";
import DeleteIcon from '@mui/icons-material/DeleteOutlineSharp';
import EditIcon from '@mui/icons-material/Edit';
import IBuildWordsGameStatistic from "../../ThereGame.Business/Models/IBuildWordsGameStatistic";
import IQuizleGameStatisticModel from "../../ThereGame.Business/Models/IQuizleGameStatistic";
import ITranslateWordsGameStatistic from "../../ThereGame.Business/Models/ITranslateWordsGameStatistic";
import IWordModel from "../../ThereGame.Business/Models/IWordModel";
import { useState } from "react";

export interface IVocabularyCardProps {
    onEditCard: (id: string) => void;
    onDeleteCard: (id: string) => void;
    quizlGamesStatistics: IQuizleGameStatisticModel[];
    buildWordsGameStatistic: IBuildWordsGameStatistic[]
    translateWordsGameStatistic: ITranslateWordsGameStatistic[];
    isShowCardStatistics: boolean;
    word: IWordModel;
}

export default function VocabularyCard(props: IVocabularyCardProps) {

    return (

        <Grid item sx={{ m: 1 }}>
            <Box height="0px">

                {!props.isShowCardStatistics
                    ? <Box sx={{ m: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton onClick={() => props.onEditCard(props.word.id)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton sx={{ color: "#b71c1c" }} onClick={() => props.onDeleteCard(props.word.id)}>
                            <DeleteIcon />
                        </IconButton>

                    </Box>
                    : <Grid container justifyContent='space-around' >
                        <Grid item>
                            <VocabularyCardQuizGameStaistics
                                quizlGamesStatistic={props.quizlGamesStatistics}
                                wordQuizlGamesId={props.word.quizlGamesId}
                            />
                        </Grid>

                        <Grid item>
                            <VocabularyCardBuildWordGamesStatistic
                                buildWordsGameStatistic={props.buildWordsGameStatistic}
                                wordId={props.word.id}
                            />
                        </Grid>

                        <Grid item>
                            <VocabularyCardTranslateWordGameStatistic
                                translateWordsGameStatistic={props.translateWordsGameStatistic}
                                wordId={props.word.id}
                            />
                        </Grid>
                    </Grid>
                }
            </Box>
            <Card sx={{
                m: 0,
                p: 0,
                width: 250,
                height: 150,
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Typography position='relative' color={'#616161'} fontWeight={600} variant="h5">{props.word.word}</Typography>
            </Card>

        </Grid>
    )
}