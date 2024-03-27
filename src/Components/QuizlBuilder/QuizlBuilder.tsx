import { useEffect, useState } from "react";
import { useWordsState } from "../../Data/useWords";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/joy/Box";
import WordModel from "../../ThereGame.Business/Models/IWordModel";
import { SpeechPart } from "../../ThereGame.Business/Models/SpeechPart";
import { IArticle, IAuxiliaryVerbForms, IPlural, IVerbForms } from "../FlashCards/NewCard/NewCard";
import { v4 as uuidv4 } from 'uuid';
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";

export interface IQuizlBuilder {
    onCreateNewWord: () => void
    setOnClose: () => void;
    quizlGame: IQuizlWordModel[]
}

export default function QuizlBuilder(props: IQuizlBuilder) {
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [wordsData] = useWordsState();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [hiddenWordId, setHiddenWord] = useState<string>("");
    const [isShowCreateNewWord, setIsShowCreateNewWord] = useState<boolean>(false);
    const [quizlWords, setQuizlGame] = useState<IQuizlWordModel[]>([]);
    const [text, setText] = useState<string>(props.quizlGame.map(game => game.word).join(' '));
    const quizlGameQueriesApi = useQuizlQueriesApi();
    const [isSaveError, setIsSaveError] = useState<boolean>(false);
    const [allowesWords, setAllowesWords] = useState<string[]>([]);
    const [isGameExist, setIsGameExsit] = useState<boolean>(false);
    const [unexisitngsWord, setUnexistingsWord] = useState<string>("");

    useEffect(() => {
        setHiddenWord(props.quizlGame.find(qg => qg.isHidden)?.wordId ?? "")
        setQuizlGame(props.quizlGame);

    }, [props.quizlGame]);

    useEffect(() => {
        if (!text) {
            return;
        }
        var splittedText = text.split(" ").filter(e => e);

        const quizleWords: IQuizlWordModel[] = splittedText.map((textedWord, index) => {

            var updatedWord = removeTextPunctiation(textedWord);
            var expectedWord = wordsData.find(word => findMatchedWordData(word, updatedWord));

            if (!expectedWord) {
                localStorage.setItem("new word", updatedWord);
                setIsShowCreateNewWord(true)

                return {
                    word: textedWord,
                    order: 0,
                    wordId: "",
                    isHidden: false,
                }
            }

            setIsShowCreateNewWord(false)

            return {
                word: textedWord,
                order: index,
                wordId: expectedWord?.id ?? "",
                isHidden: false,
            }
        })

        var unexistingsWord = quizleWords.find(qw => !qw.wordId);
        setUnexistingsWord(unexistingsWord?.word ?? "");

        setQuizlGame(quizleWords.filter(qw => !!qw.wordId));

    }, [text]);

    useEffect(() => {
        const allowedWords = quizlWords.map(qw => {
            var expectedWord = wordsData.find(wordData => wordData.id == qw.wordId)

            return expectedWord?.speechParts.includes(SpeechPart.Verb) ||
                expectedWord?.speechParts.includes(SpeechPart.Auxiliary)
                ? expectedWord.id
                : ""
            ;
        });

        var filtred = allowedWords.filter(data => data);

        setAllowesWords(filtred);

    }, [quizlWords, wordsData]);

    const findMatchedWordData = (word: WordModel, textedWord: string): WordModel | null => {

        if (word.word == textedWord ||
            (word.speechParts.includes(SpeechPart.Verb) && isVerbForm(word, textedWord)) ||
            (word.speechParts.includes(SpeechPart.Auxiliary) && isAuxiliaryVerbForm(word, textedWord)) ||
            word.speechParts.includes(SpeechPart.Noune) && isNouneForm(word, textedWord) ||
            word.speechParts.includes(SpeechPart.Article) && isArticlForm(word, textedWord)
        ) {

            return word;
        }

        return null;
    }

    const isVerbForm = (word: WordModel, textedWord: string): boolean => {
        if (!word.forms) {
            return false;
        }

        var forms: IVerbForms = JSON.parse(word.forms);
        return forms.pastSimple == textedWord ||
            forms.presentContinuous == textedWord ||
            forms.presentPerfect == textedWord ||
            forms.thirdParty == textedWord
    }

    const isAuxiliaryVerbForm = (word: WordModel, textedWord: string): boolean => {
        if (!word.forms) {
            return false;
        }

        var forms: IAuxiliaryVerbForms = JSON.parse(word.forms);

        return forms.presentSimplePlural == textedWord ||
            forms.pastSimple == textedWord ||
            forms.pastSimplePlural == textedWord ||
            forms.presentPerfect == textedWord ||
            forms.presentContinuous == textedWord ||
            forms.firstPerson == textedWord ||
            forms.secondPerson == textedWord
    }

    const isNouneForm = (word: WordModel, textedWord: string): boolean => {
        if (!word.forms) {
            return false;
        }

        var form: IPlural = JSON.parse(word.forms);

        return form.plural == textedWord;
    }

    const isArticlForm = (word: WordModel, textedWord: string): boolean => {
        if (!word.forms) {
            return false;
        }

        var form: IArticle = JSON.parse(word.forms);

        return form.nextVowels == textedWord;
    }

    const removeTextPunctiation = (word: string): string => {
        return word.toLowerCase().replace(/[.,?\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    }

    const onHideWord = (index: number) => {

        const updatedQuizleWords = [...quizlWords];

        updatedQuizleWords[index].isHidden = !updatedQuizleWords[index].isHidden;

        if (!!hiddenWordId) {
            const expectedIndex = updatedQuizleWords.findIndex(qw => qw.wordId == hiddenWordId);
            updatedQuizleWords[expectedIndex].isHidden = false;
        }

        setHiddenWord(updatedQuizleWords[index].isHidden ? updatedQuizleWords[index].wordId : "");

        var hiddenWord = updatedQuizleWords.find(uq => uq.isHidden);

        if (!!hiddenWord && hiddenWord.wordId != updatedQuizleWords[index].wordId) {
            return;
        }

        setQuizlGame(updatedQuizleWords);
    }

    const checkIsQuizleGameAlreadyExist = async (): Promise<boolean> => {
        const createdGames = await quizlGameQueriesApi.getAllByWordId(hiddenWordId);

        var matchedGames = createdGames.filter(a => a.hiddenWordId == hiddenWordId);

        var hasSameGame =  matchedGames.some(game => {

            var gamesWords: IQuizlWordModel[] = JSON.parse(game.data);
            var wordsId = gamesWords.map(games => games.wordId);

            var quizlWordsId = quizlWords.map(quizlWord => quizlWord.wordId)

           return JSON.stringify(wordsId) == JSON.stringify(quizlWordsId);
        });

        return hasSameGame
    }

    const onSave = async () => { 
        if (!hiddenWordId) {
            setIsSaveError(true)
            return;
        }

        const isAlreadyExist = await checkIsQuizleGameAlreadyExist();
        if (isAlreadyExist) {
            setIsGameExsit(true);
            return;
        }

        props.setOnClose();
        setIsOpen(false);

        const game: IQuizleGameModel = {
            id: uuidv4(),
            data: JSON.stringify(quizlWords),
            hiddenWordId: hiddenWordId
        }

        if (!!props.quizlGame.length) {
            await quizlGameQueriesApi.update(game);
            return;
        }

        await quizlGameQueriesApi.create(game);
    }


    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={() => {
                props.setOnClose()
                setIsOpen(false)
            }}
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
            <DialogContent>

                <DialogContentText>Type sentence and select a word to hide it</DialogContentText>

                <DialogContentText>
                    <Box display='flex' flexDirection='column' alignItems='center' width="100%">

                        <TextField
                            error={isSaveError}
                            variant='standard'
                            fullWidth
                            helperText={isSaveError ? "Please select a word" : ""}
                            value={text}
                            onChange={event => setText(event.target.value)}
                        />

                        {isShowCreateNewWord || unexisitngsWord
                            ? <Button onClick={props.onCreateNewWord} >Create new word</Button>
                            : null
                        }

                        <Grid container direction={"row"} justifyContent='center' sx={{ m: 1 }}>
                            {quizlWords.map((word, index) => (
                                <Box>
                                    {!allowesWords.find(aw => aw == word.wordId)
                                        ? <Typography marginLeft={1} variant="h6">{word.word}</Typography>
                                        : <Button
                                            sx={{ ml: 1 }}
                                            variant={word.isHidden ? 'text' : 'outlined'}
                                            onClick={() => onHideWord(index)}

                                        >
                                            <Typography marginLeft={1}>{word.isHidden ? '_' : word.word}</Typography>
                                        </Button>
                                    }
                                </Box>
                            ))}
                        </Grid>

                        <Typography color={isGameExist ? 'red' : ''}>{isGameExist ? "The game already exist" : ""}</Typography>
                        <Typography color={!!unexisitngsWord ? 'darkYellow' : ''}>{!!unexisitngsWord ? `The word ' ${unexisitngsWord.toUpperCase()} ' doesn't exist! Plase create the new word` : ""}</Typography>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSave} autoFocus>
                    Save
                </Button>
                <Button onClick={() => {
                    setIsOpen(false)
                    props.setOnClose()
                }
                } autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    )
}