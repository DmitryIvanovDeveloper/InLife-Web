import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import ActionButton from "../../Button/ActionButton";
import Save from '@mui/icons-material/Save';
import IWordModel, { IWordTrasnalteModel } from "../../../ThereGame.Business/Models/IWordModel";
import { LanguageType } from "../../../Data/LanguageType";
import { v4 as uuidv4 } from 'uuid';
import { useWordsState } from "../../../Data/useWords";
import useWordsQueriesApi from "../../../ThereGame.Api/Queries/WordsQueriesApi";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ImageLoader from "../ImageLoader";
import { SpeechPart } from "../../../ThereGame.Business/Models/SpeechPart";
import SpeechPartSelect from "../../Select/SpeechPartSelect";
import PhrazalVerb, { IPhrasalVerb } from "./PhrasalVerb";

const defaultWordModel: IWordModel = {
    id: "",
    word: "",
    speechParts: [],
    pictures: [],
    forms: "",
    quizlGamesId: [],
    wordTranslates: [{
        id: "",
        wordId: "",
        language: LanguageType.Russian,
        translates: []

    }]
}
const verbDefaultForms: IVerbForms = {
    pastSimple: "",
    presentPerfect: "",
    presentContinuous: "",
    thirdParty: ""
}
const defaultForms: IAuxiliaryVerbForms = {
    presentSimplePlural: "",
    pastSimple: "",
    pastSimplePlural: "",
    presentPerfect: "",
    presentContinuous: "",
    firstPerson: "",
    secondPerson: "",
}

export interface IVerbForms {
    pastSimple: string;
    presentPerfect: string;
    presentContinuous: string;
    thirdParty: string;
}

export interface IAuxiliaryVerbForms {
    presentSimplePlural: string,
    pastSimple: string;
    pastSimplePlural: string;
    presentPerfect: string;
    presentContinuous: string;
    firstPerson: string;
    secondPerson: string;
}


export interface IPlural {
    plural: string;
}

export interface INewCardProps {
    studentId: string;
    cardData?: IWordModel | null | undefined;
}

export default function NewCard(props: INewCardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSpecidicWord, setIsSpecificWord] = useState<boolean>(false);
    const [wordData, setWordData] = useState<IWordModel>(defaultWordModel);
    const [wordsData] = useWordsState();
    const [matchedWordData, setMatchedWordData] = useState<IWordModel[]>([]);
    const wordQueriesApi = useWordsQueriesApi();
    const [verbForms, setVerbForms] = useState<IVerbForms>(verbDefaultForms);
    const [plural, setPlural] = useState<IPlural>({ plural: "" });
    const [auxiliaryVerbForms, setAxiliaryVerbForms] = useState<IAuxiliaryVerbForms>(defaultForms);
    const [phrasalVerbForms, setPhrasalVerbsForms] = useState<IPhrasalVerb>({wordsId: []});
    const [isIrregular, setIsIrregular] = useState<boolean>(false);

    const [wordsId, setWordsId] = useState<string[]>([])

    useEffect(() => {
        setIsIrregular(!!verbForms?.presentPerfect);
    }, [verbForms]);

    const handleCheck = (event: any) => {
        setIsIrregular(event.target.checked)
    }

    useEffect(() => {
        if (!!props.cardData) {

            setWordData(props.cardData);

            if (props.cardData.speechParts.includes(SpeechPart.Verb) && !!props.cardData.forms) {
                var verbForms: IVerbForms = JSON.parse(props.cardData.forms)
                setVerbForms(verbForms);
            }
            if (props.cardData.speechParts.includes(SpeechPart.Noune) && !!props.cardData.forms) {
                var plural: IPlural = JSON.parse(props.cardData.forms)
                setPlural(plural);
            }
            if (props.cardData.speechParts.includes(SpeechPart.Auxiliary) && !!props.cardData.forms) {
                var auxiliaryForms: IAuxiliaryVerbForms = JSON.parse(props.cardData.forms)
                setAxiliaryVerbForms(auxiliaryForms);
            }
            if (props.cardData.speechParts.includes(SpeechPart.PhrasalVerb) && !!props.cardData.forms) {
                var phrasalVerbForms: IPhrasalVerb = JSON.parse(props.cardData.forms)
                setPhrasalVerbsForms(phrasalVerbForms);
            }

            return;
        }
        const wordId = uuidv4();

        const defaultWordData: IWordModel = {
            id: wordId,
            word: localStorage.getItem("new word") ?? "",
            pictures: [],
            speechParts: [],
            forms: "",
            quizlGamesId: [],
            wordTranslates: [{
                id: uuidv4(),
                wordId: wordId,
                language: LanguageType.Russian,
                translates: [""]

            }]
        }
        setWordData(defaultWordData);
    }, []);

    useEffect(() => {

        if (wordData.speechParts.includes(SpeechPart.Verb) ||
            wordData.speechParts.includes(SpeechPart.Auxiliary) ||
            wordData.speechParts.includes(SpeechPart.Noune) ||
            wordData.speechParts.includes(SpeechPart.PhrasalVerb)
        ) {
            setIsSpecificWord(true);
            return;
        }
        setIsSpecificWord(false);

    }, [wordData.speechParts]);

    const onChangeSpeechParts = (speechParts: SpeechPart[]) => {
        setWordData(prev => ({
            ...prev,
            speechParts
        }))
    };

    const onWordChange = (word: string) => {
        setWordData(prev => ({
            ...prev,
            word: word
        }))
    }
    useEffect(() => {
        var forms = "";

        if (props.cardData?.speechParts.includes(SpeechPart.Verb)) {
            forms = JSON.stringify(verbForms);
        }
        if (props.cardData?.speechParts.includes(SpeechPart.Noune)) {
            forms = JSON.stringify(plural);
        }
        if (props.cardData?.speechParts.includes(SpeechPart.Auxiliary)) {
            forms = JSON.stringify(auxiliaryVerbForms);
        }
        if (props.cardData?.speechParts.includes(SpeechPart.PhrasalVerb)) {
            forms = JSON.stringify(phrasalVerbForms);
        }

        setWordData(prev => ({
            ...prev,
            forms
        }))
    }, [verbForms, plural, auxiliaryVerbForms]);

    const onAnswersChange = (answer: string, index: number) => {

        const wordTranslateIndex = wordData.wordTranslates.findIndex(wt => wt.language == LanguageType.Russian);
        const wordTranslate = wordData.wordTranslates[wordTranslateIndex];
        if (wordTranslateIndex == null) {
            return;
        }

        const updatedTranslate = [...wordTranslate.translates];
        updatedTranslate[index] = answer;

        const updatedTranslates: IWordTrasnalteModel = {
            id: wordTranslate.id,
            wordId: wordTranslate.wordId,
            language: wordTranslate.language,
            translates: updatedTranslate.filter(item => item)
        }

        const updatedWordTranslates = [...wordData.wordTranslates];
        updatedWordTranslates[wordTranslateIndex] = updatedTranslates;

        setWordData(prev => ({
            ...prev,
            wordTranslates: updatedWordTranslates
        }))
    }

    const onAddAnswer = () => {
        const wordTranslate = wordData.wordTranslates.find(wt => wt.language == LanguageType.Russian)
        if (!wordTranslate) {
            return;
        }

        const updatedWordTranslates: IWordTrasnalteModel = {
            id: wordTranslate.id,
            wordId: wordTranslate.wordId,
            language: wordTranslate.language,
            translates: [...wordTranslate.translates, ""]
        }
        const wordTranslates = [...wordData.wordTranslates];
        wordTranslates[0] = updatedWordTranslates; //TODO: Improve

        setWordData(prev => ({
            ...prev,
            wordTranslates: wordTranslates
        }))
    }


    useEffect(() => {
        if (!wordData.word || !!props.cardData) {
            return;
        }
        const matchedWordData = wordsData.filter(value => value.word.toLowerCase().includes(wordData.word.toLowerCase()))
        setMatchedWordData(matchedWordData);
    }, [wordData.word]);

    const onUpdateVocabularyBlock = async () => {
        localStorage.removeItem("new word");
        if (!props.cardData) {
            await wordQueriesApi.create(wordData);
            return;
        }
        await wordQueriesApi.update(wordData);
    }

    const isDoubleWord = (): boolean => {
        return matchedWordData.length == 1 && matchedWordData[0].word == wordData.word
    }

    const onSelectWordData = (wordData: IWordModel) => {
        setMatchedWordData([])

        setWordData(wordData);
    }

    const onRemovePicture = (index: number) => {
        const filtredPictures = wordData.pictures.filter(picture => picture != wordData.pictures[index]);

        setWordData(prev => ({
            ...prev,
            pictures: filtredPictures
        }));
    }
    const onAddPicture = (picture: any) => {
        setWordData(prev => ({
            ...prev,
            pictures: [...prev.pictures, picture.dfworata_url]
        }));
    }

    function VerbConstructor() {
    
        return (
            <Grid container>
                <FormGroup>
                    <FormControlLabel checked={isIrregular} onChange={handleCheck} control={<Checkbox defaultChecked />} label="Irregular" />
                </FormGroup>
                <Grid item>
                    <TextField
                        value={wordData.word}
                        onChange={(event) => onWordChange(event.target.value)}
                        sx={{ m: 1, }}
                        label='Present Simple'>
                    </TextField>

                    <TextField
                        value={verbForms.pastSimple}
                        onChange={(event) => setVerbForms(prev => ({ ...prev, pastSimple: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Past Simple'>
                    </TextField>
                    {isIrregular
                        ? <TextField
                            value={verbForms.presentPerfect}
                            onChange={(event) => setVerbForms(prev => ({ ...prev, presentPerfect: event.target.value }))}
                            sx={{ m: 1, }}
                            label='Present Perfect'>
                        </TextField>
                        : null
                    }

                    <TextField
                        value={verbForms.presentContinuous}
                        onChange={(event) => setVerbForms(prev => ({ ...prev, presentContinuous: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Present Continuous'>
                    </TextField>

                    <TextField
                        value={verbForms.thirdParty}
                        onChange={(event) => setVerbForms(prev => ({ ...prev, thirdParty: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Third Party'>
                    </TextField>

                </Grid>
            </Grid>
        )
    }

 


    function AuxiliaryVerbConstructor() {

        return (
            <Grid container>

                <Grid item>
                    <TextField
                        value={wordData.word}
                        onChange={(event) => onWordChange(event.target.value)}
                        sx={{ m: 1, }}
                        label='Present Simple'>
                    </TextField>
                    <TextField
                        value={auxiliaryVerbForms.presentSimplePlural}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, presentSimplePlural: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Present Simple plural'>
                    </TextField>

                    <TextField
                        value={auxiliaryVerbForms.pastSimple}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, pastSimple: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Past Simple'>
                    </TextField>

                    <TextField
                        value={auxiliaryVerbForms.pastSimplePlural}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, pastSimplePlural: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Past Simple plural'>
                    </TextField>

                    <TextField
                        value={auxiliaryVerbForms.presentPerfect}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, presentPerfect: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Present Perfect'>
                    </TextField>

                    <TextField
                        value={auxiliaryVerbForms.presentContinuous}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, presentContinuous: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Present Continuous'>
                    </TextField>

                    <TextField
                        value={auxiliaryVerbForms.firstPerson}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, firstPerson: event.target.value }))}
                        sx={{ m: 1, }}
                        label='First Person'>
                    </TextField>
                    <TextField
                        value={auxiliaryVerbForms.secondPerson}
                        onChange={(event) => setAxiliaryVerbForms(prev => ({ ...prev, secondPerson: event.target.value }))}
                        sx={{ m: 1, }}
                        label='Second Person'>
                    </TextField>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ m: 1 }}>
                {!props.cardData
                    ? <Typography>New Card</Typography>
                    : <Typography>Edit Card</Typography>
                }
            </Box>

            <Grid>
                {matchedWordData.map(md => (
                    <Button
                        onClick={() => onSelectWordData(md)}
                        sx={{ m: 1 }}
                        variant='outlined'
                    >
                        <Typography sx={{ m: 1 }}>{md.word}</Typography>
                    </Button>
                ))}

            </Grid>
            <ImageLoader
                setImage={onAddPicture}
            />


            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <ImageList variant="woven" sx={{ width: "100%", maxHeight: 300, minHeight: 150 }} cols={3} rowHeight={164}>
                    {wordData.pictures.map((picture, index) => (
                        <Box>
                            <IconButton onClick={() => onRemovePicture(index)}>
                                <HighlightOffRoundedIcon />
                            </IconButton>

                            <ImageListItem key={uuidv4()} >
                                <img
                                    style={{ width: 150, height: 150 }}
                                    srcSet={`${picture}`}
                                    src={`${picture}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Box>

                    ))}
                </ImageList>

                <SpeechPartSelect setSelectedSpeechParts={onChangeSpeechParts} selectedSpeechParts={wordData.speechParts} />

                <Grid container>
                    {isSpecidicWord
                        ? null
                        : <Grid item>
                            <TextField
                                value={wordData.word}
                                onChange={(event) => onWordChange(event.target.value)}
                                sx={{ m: 1, }}
                                label='word'>
                            </TextField>
                        </Grid>
                    }


                    {wordData.speechParts.includes(SpeechPart.Verb)
                        ? VerbConstructor()
                        : null
                    }

                    {wordData.speechParts.includes(SpeechPart.Noune)
                        ? <Grid item>
                            <TextField
                                value={plural.plural}
                                onChange={(event) => setPlural({ plural: event.target.value })}
                                sx={{ m: 1, }}
                                label='Plural'>
                            </TextField>
                        </Grid>
                        : null
                    }

                    {wordData.speechParts.includes(SpeechPart.Auxiliary)
                        ? AuxiliaryVerbConstructor()
                        : null
                    }
                    {wordData.speechParts.includes(SpeechPart.PhrasalVerb)
                        ? <PhrazalVerb 
                            word={wordData.word} 
                            setPhrasalVerbsForms={setPhrasalVerbsForms}
                            onWordChange={onWordChange}
                        />
                        : null
                    }
                    

                </Grid>

                <Box>
                    {!wordData.wordTranslates?.length
                        ? null
                        : wordData.wordTranslates[0]?.translates?.map((answer, index) => (
                            <TextField value={answer} onChange={(event) => onAnswersChange(event.target.value, index)} sx={{ m: 1 }} label='answer'></TextField>
                        ))}
                </Box>

                <Button onClick={onAddAnswer}>Add translate</Button>
                <ActionButton icon={<Save />} onClick={onUpdateVocabularyBlock} isLoading={isLoading} isDisabled={isDoubleWord()} />
            </Card>
        </Box>

    )
}