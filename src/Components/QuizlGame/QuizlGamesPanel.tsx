import { useEffect, useState } from "react";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel";
import { useMediaQuery, Dialog, DialogContent, DialogContentText, DialogActions, useTheme, Button, Typography, CircularProgress, Box, Card, List, CardActions, CardActionArea, IconButton } from "@mui/material";
import QuizlBuilder from "../QuizlBuilder/QuizlBuilder";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface IQuizlGameCard {
    id: string;
    words: IQuizlWordModel[]
}

export interface IQuizlGameProps {
    quizleGamesId: string[];
    onClose: () => void
    onCreateNewWord: () => void;
}
export default function QuizlGamesPanel(props: IQuizlGameProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const quizlGameQueriesApi = useQuizlQueriesApi();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [quizleGames, setQuizlGames] = useState<IQuizleGameModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [quizleGamesCards, setQuizleGamesCards] = useState<IQuizlGameCard[]>([])
    const [selectedCard, setSelectedCard] = useState<IQuizlGameCard | null>(null);


    useEffect(() => {
        setIsLoading(true);

        quizlGameQueriesApi
            .get(props.quizleGamesId)
            .then(quizleGames => {
                setQuizlGames(quizleGames);
                setIsLoading(false);
            })
    }, [props.quizleGamesId]);

    useEffect(() => {
        if (!quizleGames.length) {
            return;
        }
        var quizleGamesCards: IQuizlGameCard[] = quizleGames.map(quizleGame => {

            const quizleGameCard: IQuizlGameCard = {
                id: quizleGame.id,
                words: JSON.parse(quizleGame.data)
            }

            return quizleGameCard;
        })

        setQuizleGamesCards(quizleGamesCards);

    }, [quizleGames]);

    const onDelete = async (id: string) => {
        await quizlGameQueriesApi.delete(id);
        quizlGameQueriesApi
        .get(props.quizleGamesId)
        .then(quizleGames => {
            setQuizlGames(quizleGames);
        })
    }


    if (!!selectedCard) {
        return <QuizlBuilder
            onCreateNewWord={props.onCreateNewWord}
            setOnClose={() => setSelectedCard(null)}
            quizlGame={selectedCard.words}
        />
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={() => props.onClose}
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
                    {!isLoading
                        ?
                        <List>
                            {quizleGamesCards.map(card => (
                                <Box display='flex'>
                                    <CardActionArea onClick={() => setSelectedCard(card)} sx={{ m: 1, }} >
                                        <Box display='flex' flexDirection='row'>
                                            {card.words.map(word => (
                                                <Typography variant="h5" color={word.isHidden ? 'green' : ''} sx={{ m: 1 }}>{word.word}</Typography>
                                            ))}
                                        </Box>

                                    </CardActionArea>

                                    <IconButton onClick={() => onDelete(card.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Box>
                            ))
                        }</List>

                        : <CircularProgress />
                    }

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}