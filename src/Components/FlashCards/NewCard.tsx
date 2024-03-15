import { Box, Button, Card, FormControl, Grid, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActionButton from "../Button/ActionButton";
import Save from '@mui/icons-material/Save';
import IWordModel, { IWordTrasnalteModel } from "../../ThereGame.Business/Models/IWordModel";
import { LanguageType } from "../../Data/LanguageType";
import { v4 as uuidv4 } from 'uuid';
import useStudentQueriesApi from "../../ThereGame.Api/Queries/StudentQueriesApi";
import { useWordsState } from "../../Data/useWords";
import useWordsQueriesApi from "../../ThereGame.Api/Queries/WordsQueriesApi";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ImageLoader from "./ImageLoader";


const defaultWordModel: IWordModel = {
    id: "",
    word: "",
    pictures: [],
    wordTranslates: [{
        id: "",
        wordId: "",
        language: LanguageType.Russian,
        translates: []

    }]
}

export interface INewCardProps {
    studentId: string;
    cardData?: IWordModel | null | undefined;
}

export default function NewCard(props: INewCardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoty, setCategoty] = useState('');
    const [wordData, setWordData] = useState<IWordModel>(defaultWordModel);
    const [wordsData] = useWordsState();
    const [matchedWordData, setMatchedWordData] = useState<IWordModel[]>([]);
    const studentQueriesApi = useStudentQueriesApi();
    const wordQueriesApi = useWordsQueriesApi();

    useEffect(() => {
        if (!!props.cardData) {
            setWordData(props.cardData);
            return;
        }
        const wordId = uuidv4();

        const defaultWordData: IWordModel = {
            id: wordId,
            word: "",
            pictures: [],
            wordTranslates: [{
                id: uuidv4(),
                wordId: wordId,
                language: LanguageType.Russian,
                translates: [""]

            }]
        }

        setWordData(defaultWordData);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setCategoty(event.target.value);
    };

    const onWordChange = (word: string) => {
        setWordData(prev => ({
            ...prev,
            word: word
        }))
    }
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
        await wordQueriesApi.create(wordData);


        // await studentQueriesApi.updateVocabularyBlock(studentVocabularyBlock)
        return;

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
            pictures: [...prev.pictures, picture.data_url]
        }));
    }
    return (
        <Box display='flex' flexDirection='column'>
            <Box sx={{ m: 1 }}>
                {!props.cardData
                    ? <Typography>New Card</Typography>
                    : <Typography>Edit Card</Typography>
                }
            </Box>

            <ImageLoader
                setImage={onAddPicture}
            />

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

            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <ImageList variant="woven" sx={{ width: "100%", maxHeight: 300, minHeight: 150 }} cols={3} rowHeight={164}>
                    {wordData.pictures.map((picture, index) => (
                        <Box>
                            <IconButton onClick={() => onRemovePicture(index)}>
                                <HighlightOffRoundedIcon />
                            </IconButton>

                            <ImageListItem key={uuidv4()} >
                                <img
                                    style={{width: 150, height: 150}}
                                    srcSet={`${picture}`}
                                    src={`${picture}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Box>

                    ))}
                </ImageList>
                <TextField
                    value={wordData.word} onChange={(event) => onWordChange(event.target.value)} sx={{ m: 1, }} label='word'></TextField>
                <Box>
                    {!wordData.wordTranslates?.length
                        ? null
                        : wordData.wordTranslates[0]?.translates?.map((answer, index) => (
                            <TextField value={answer} onChange={(event) => onAnswersChange(event.target.value, index)} sx={{ m: 1 }} label='answer'></TextField>
                        ))}
                </Box>

                <Button onClick={onAddAnswer}>Add translate</Button>
                <ActionButton icon={<Save />} onClick={onUpdateVocabularyBlock} isLoading={isLoading} isDisabled={!wordData.word || isDoubleWord()} />
            </Card>
        </Box>

    )
}