import { Alert, Box, Button, ButtonGroup, Divider, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddButton from "../../components/Button/AddButton";
import SaveButton from "../../components/Button/SaveButton";
import { useSelection } from "../../Data/useSelection";
import { useAnswer, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
import MistakeExplanationConstructor from "./MistakeExplanationsConstructor";
import TranslateConstructor from "./TranslateConstructor";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import { LanguageType } from "../../Data/LanguageType";
import { v4 as uuidv4 } from 'uuid';
import PhraseContructor from "../phraseContructor/PhraseContructor";
import ITranslateModel from "../../ThereGame.Business/Models/ITranslateModel";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import AppBarDeleteButton from "../../components/AppBarDeleteButton";
import EquivalentTextConstructor from "./EquivalentTextConstructor";
import LinarProgressCustom from "../../components/CircularProgress";
import DevidedLabel from "../../components/Headers/DevidedLabel";
import TensesList from "../phraseContructor/TensesList/TensesList";
import { useTreeState } from "../../Data/useTreeState";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import ChatGptService from "../../ThereGame.Infrastructure/Services/ChatGpt/ChatGptService";
import IChatGPTResponseDto, { IDataResponse } from "../../ThereGame.Infrastructure/Services/ChatGpt/Dtos/IChatGptResponseDto";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    parentId: string,
    setStates?: (states: DialogueItemStateType[]) => void;
}



export default function AnswerContructor(props: IAnswerContructor): JSX.Element | null {

    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();

    const [treeState, setTreeState] = useTreeState();
    const [selection, setSelection] = useSelection();

    const [answer, setAnswer] = useState<IAnswerModel>(answerRecoil);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [status, setStatus] = useState<Status>(Status.OK);

    const [isEdited, setIsEdited] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isChatGptLoading, setIsChatGptLoading] = useState<boolean>(false);

    const onAddPhraseButtonClick = async () => {
        setIsCreating(true)
        var status = await phraseQueriesApi.create(props.id);
        setStatus(status);
        setIsCreating(false)

    }
    const onChangeText = (event: any) => {
        setAnswer(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsEdited(false);
    }

    const onPhraseButtonClick = (event: any) => {
        setSelection(event.target.id);

        setTreeState(prev => ({
            expanded: [...prev.expanded, event.target.id],
            selected: event.target.id
        }));

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={event.target.id} parentId={props.parentId} />);
    }

    const onWordsToUseChange = (wordsToUse: string) => {
        setAnswer(prev => ({
            ...prev,
            wordsToUse: wordsToUse
        }));

        setIsEdited(false);
    }

    // Mistake Explanation
    const onExplanationChange = (event: any, index: number) => {
        var explanation = [...answer.mistakeExplanations];

        if (event.target.id == 'word') {
            explanation[index].word = event.target.value;
        }
        if (event.target.id == 'mistake explanation') {
            explanation[index].explanation = event.target.value;
        }

        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: explanation
        }));
    }

    const onAddMistakeExplanation = () => {
        const mistakeExplanation: IMistakeExplanationModel = {
            parentId: props.id,
            word: "",
            explanation: "",
            id: uuidv4()
        }

        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: [
                ...prev.mistakeExplanations,
                mistakeExplanation
            ]
        }));

        setIsEdited(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: [...answer.mistakeExplanations]
                .filter(explanation => explanation.id != id)
        }));

        setIsEdited(false);
    }

    // Translate
    const onAddTranslate = () => {
        var translate: ITranslateModel = {
            parentId: props.id,
            id: uuidv4(),
            language: LanguageType.Russian,
            text: ""
        }

        setAnswer(prev => ({
            ...prev,
            translates: [...answer.translates, translate]
        }));

        setIsEdited(false);
    }

    const onDeleteTranslate = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            translates: [...answer.translates]
                .filter(translate => translate.id != id)
        }));

        setIsEdited(false);
    }

    const onTranslateChange = (translates: ITranslateModel[]) => {
        setAnswer(prev => ({
            ...prev,
            translates: translates
        }));

        setIsEdited(false);
    }

    const onSetTenses = (tenses: string[]) => {
        setAnswer(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsEdited(false)
    }

    const ChatGpt = async (sentence: string) => {
        if (!sentence) {
            return;
        }
        
        setIsChatGptLoading(true);
        var result = await new ChatGptService().request(sentence);

        var chatGPTResponse: IChatGPTResponseDto = result?.data;

        chatGPTResponse.choices.map(choice => {
            var data: IDataResponse = JSON.parse(choice.message.content);

            data.variations.map(variation => {
                onAddEquivalentAnswer(variation);
            })
            var translates = data.translations.map(translate => {
                return {
                    parentId: answer.id,
                    id: uuidv4(),
                    language: LanguageType.Russian,
                    text: translate
                }
            });

            onTranslateChange(translates);
            onWordsToUseChange(data.words_uppercase);
            onSetTenses(data.tenseses);
        });
        setIsChatGptLoading(false);

    }

    const reset = () => {
        setAnswer(answerRecoil);
        setIsEdited(true);

        localStorage.removeItem(props.id);
    }

    // QueriesApi
    const onDelete = async () => {
        setIsDeleting(true);
        await answerQueriesApi.delete(props.id)
        setIsDeleting(false);
        setIsEdited(true)
        setDialogueItemConstructor(() => null);
    }

    const onSave = async () => {
        setIsLoading(true);
        await answerQueriesApi.update(answer)
        setIsLoading(false);
        setIsEdited(true);
        localStorage.removeItem(props.id)
    }

    const onChangeEquivalentAnswer = (value: string, index: number) => {
        var texts = [...answer.texts];
        texts[index] = value;

        setAnswer(prev => ({
            ...prev,
            texts: texts
        }))

        setIsEdited(false);
    }
    const onAddEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: [...prev.texts, value]
        }))

        setIsEdited(false);
    }

    const onRemoveEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: prev.texts.filter(text => text != value)
        }));

        setIsEdited(false);
    }

    // UseEffects
    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setAnswer(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setAnswer(JSON.parse(data));
    }, [answerRecoil]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setAnswer(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setAnswer(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(answer));
    }, [answer]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (JSON.stringify(answerRecoil) !== data) {
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [answer]);

    useEffect(() => {
        if (!props.setStates) {
            return;
        }

        if (isEdited) {
            props.setStates([DialogueItemStateType.NoErrors])
            return;
        }

        props.setStates([DialogueItemStateType.UnsavedChanges])
    }, [isEdited]);

    useEffect(() => {
        console.log(answer.tensesList)
    }, [answer.tensesList])
    if (!answer) {
        return null;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 800,
                overflow: "hidden",
                overflowY: "scroll",
            }}
            noValidate
            autoComplete="off"
        >
            <AppBarDeleteButton
                name='Answer Constructor'
                onDelete={onDelete}
            />

            {isDeleting
                ? <LinarProgressCustom name="Deleting" />
                : null
            }

            <TensesList tensesList={answer.tensesList} setTensesList={onSetTenses} />

            <EquivalentTextConstructor
                onChangeEquivalentAnswer={onChangeEquivalentAnswer}
                onAddEquivalentAnswer={onAddEquivalentAnswer}
                onRemoveEquivalentAnswer={onRemoveEquivalentAnswer}
                texts={answer.texts}
                chatGpt={ChatGpt}
                isLoading={isChatGptLoading}
            />

            <DevidedLabel name="Words Hints" />

            <TextField
                InputLabelProps={{ shrink: true }}
                placeholder="Hello, You, Meet, etc."
                value={answer.wordsToUse}
                id="outlined-basic"
                label="Words to use"
                variant="outlined"
                onChange={(event) => onWordsToUseChange(event.target.value)}
                required={true}
                fullWidth
            ></TextField>


            <TranslateConstructor
                translates={answer.translates}
                onAddTranslate={onAddTranslate}
                onDeleteTranslate={onDeleteTranslate}
                onTranslateChange={onTranslateChange}
            />

            <Divider variant="fullWidth" />

            {/* <MistakeExplanationConstructor
                explanations={answer.mistakeExplanations}
                onDeleteMistakeExplanation={onDeleteMistakeExplanation}
                onExplanationChange={onExplanationChange}
                onAddMistakeExplanation={onAddMistakeExplanation}
            /> */}

            <Divider variant="fullWidth" />

            {!isEdited
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            }

            <SaveButton
                onClick={onSave}
                isLoading={isLoading}
                isDisabled={false}
            />

            <DevidedLabel name="Linked phrases" />

            {isCreating
                ? <LinarProgressCustom name="Creating" />
                : <AddButton onClick={onAddPhraseButtonClick} name="Create Phrase" />
            }

            {answer.phrases?.length != 0
                ?
                <Box>
                    <ButtonGroup
                    >
                        {answer.phrases?.map(phrase => (
                            <Button
                                id={phrase.id}
                                onClick={onPhraseButtonClick}
                                sx={{ m: 1, }}>{!phrase.text ? "New Pharse" : phrase.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }
        </Box>
    )
}

