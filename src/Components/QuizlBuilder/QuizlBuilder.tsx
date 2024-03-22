import { useEffect, useState } from "react";
import { useWordsState } from "../../Data/useWords";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/joy/Box";
import WordModel from "../../ThereGame.Business/Models/IWordModel";
import { SpeechPart } from "../../ThereGame.Business/Models/SpeechPart";
import { IAuxiliaryVerbForms, IPlural, IVerbForms } from "../FlashCards/NewCard/NewCard";
import { v4 as uuidv4 } from 'uuid';
import IQuizleGameModel, { IQuizlWordModel } from "../../ThereGame.Business/Models/IQuizleWordModel";
import useQuizlQueriesApi from "../../ThereGame.Api/Queries/QuizlGameQueriesApi";

export interface IQuizlBuilder {
    onCreateNewWord: () => void
}

export default function QuizlBuilder(props: IQuizlBuilder) {
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [wordsData] = useWordsState();

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [hiddenWordId, setHiddenWord] = useState<string>("");
    const [isShowCreateNewWord, setIsShowCreateNewWord] = useState<boolean>(false);
    const [quizlWords, setQuizlGame] = useState<IQuizlWordModel[]>([]);
    const [text, setText] = useState<string>("");
    const quizGameQueriesApi = useQuizlQueriesApi();
    const [isSaveError, setIsSaveError] = useState<boolean>(false);

    useEffect(() => {
    
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

        setQuizlGame(quizleWords.filter(qw => !!qw.wordId));
    
    }, [text]);

    const findMatchedWordData = (word: WordModel, textedWord: string): WordModel | null => {
        
        if (word.word == textedWord ||
            (word.speechParts.includes(SpeechPart.Verb) && isVerbForm(word, textedWord)) ||
            (word.speechParts.includes(SpeechPart.Auxiliary) && isAuxiliaryVerbForm(word, textedWord)) ||
            word.speechParts.includes(SpeechPart.Noune) && isNouneForm(word, textedWord)
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

    const removeTextPunctiation = (word: string): string => {
        return word.toLowerCase().replace(/[.,?\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    }

    const onHideWord = (index: number) => {
        const updatedQuizleWords = [...quizlWords];
        updatedQuizleWords[index].isHidden = !updatedQuizleWords[index].isHidden;
        setHiddenWord(updatedQuizleWords[index].isHidden ? updatedQuizleWords[index].wordId : "");

        var hiddenWord = updatedQuizleWords.find(uq => uq.isHidden);

        if (!!hiddenWord && hiddenWord.wordId != updatedQuizleWords[index].wordId) {
            return;
        }

        setQuizlGame(updatedQuizleWords);
    }

    const onSave = async () => {
        if (!hiddenWordId) {
            setIsSaveError(true)
            return;
        }
        const game: IQuizleGameModel = {
            id: uuidv4(),
            data: JSON.stringify(quizlWords),
            hiddenWordId: hiddenWordId
        }

        await quizGameQueriesApi.create(game);
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={() => setIsOpen(false)}
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
                    <Box display='flex' flexDirection='column' alignItems='center' width="100%">
                        <TextField error={isSaveError} helperText={isSaveError ? "Please select a word" : ""} value={text} onChange={event => setText(event.target.value)}></TextField>
                        {isShowCreateNewWord
                            ? <Button onClick={props.onCreateNewWord} >Create new word</Button>
                            : null
                        }
                        <Grid container direction={"row"} justifyContent='center' sx={{ m: 1 }}>
                            {quizlWords.map((word, index) => (
                                <Button sx={{ ml: 1 }} variant={word.isHidden ? 'text' : 'outlined'} onClick={() => onHideWord(index)}>
                                    <Typography marginLeft={1}>{word.word}</Typography>
                                </Button>
                            ))}

                        </Grid>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSave} autoFocus>
                    Save
                </Button>
                <Button onClick={() => setIsOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    )
}