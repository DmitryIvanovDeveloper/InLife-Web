import { Alert, Box, Button, ButtonGroup, Divider, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddButton from "../../components/buttons/AddButton";
import SaveButton from "../../components/buttons/SaveButton";
import { useSelection } from "../../Data/useSelection";
import { useAnswer, useDialogueItemConstructor } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
import MistakeExplanationConstructor from "./MistakeExplanationsConstructor";
import TranslateConstructor from "./TranslateConstructor";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import { LanguageType } from "../../Data/LanguageType";
import { v4 as uuidv4 } from 'uuid';
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor";
import ITranslateModel from "../../ThereGame.Business/Models/ITranslateModel";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import AppBarDeleteButton from "../../components/AppBarDeleteButton";
import EquivalentTextConstructor from "./EquivalentTextConstructor";
import LinarProgressCustom from "../../components/CircularProgress";
import DevidedLabel from "../../components/Headers/DevidedLabel";
import TensesList from "../TensesList";
import { useTreeState } from "../../Data/useTreeState";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";

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

    const [isSaved, setIsSaved] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

        setIsSaved(false);
    }

    const onPhraseButtonClick = (event: any) => {
        setSelection(event.target.id);

        setTreeState(prev => ({
            expanded: [...prev.expanded, event.target.id], 
            selected: event.target.id
        }));

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={event.target.id} parentId={props.parentId} />);
    }

    const onWordsToUseChange = (event: any) => {
        setAnswer(prev => ({
            ...prev,
            wordsToUse: event.target.value
        }));

        setIsSaved(false);
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

        setIsSaved(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: [...answer.mistakeExplanations]
                .filter(explanation => explanation.id != id)
        }));

        setIsSaved(false);
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

        setIsSaved(false);
    }

    const onDeleteTranslate = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            translates: [...answer.translates]
                .filter(translate => translate.id != id)
        }));

        setIsSaved(false);
    }

    const onTranslateChange = (translates: ITranslateModel[]) => {
        setAnswer(prev => ({
            ...prev,
            translates: translates
        }));

        setIsSaved(false);
    }

    const onSetTenses = (tenses: string[]) => {
        setAnswer(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsSaved(false)
    }

    const reset = () => {
        setAnswer(answerRecoil);
        setIsSaved(true);

        localStorage.removeItem(props.id);
    }

    // QueriesApi
    const onDelete = async () => {
        setIsDeleting(true);
        await answerQueriesApi.delete(props.id)
        setIsDeleting(false);
        setIsSaved(true)
    }

    const onSave = async () => {
        setIsLoading(true);
        await answerQueriesApi.update(answer)
        setIsLoading(false);
        localStorage.removeItem(props.id)
    }

    const onChangeEquivalentAnswer = (value: string, index: number) => {
        var texts = [...answer.texts];
        texts[index] = value;
        
        setAnswer(prev => ({
            ...prev,
            texts: texts
        }))

        setIsSaved(false);
    }
    const onAddEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: [...prev.texts, value]
        }))

        setIsSaved(false);
    }

    const onRemoveEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: prev.texts.filter(text => text != value)
        }));

        setIsSaved(false);
    }

    // UseEffects
    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setAnswer(answerRecoil);
            setIsSaved(true);
            return;
        }
        setIsSaved(false);

        setAnswer(JSON.parse(data));
    }, [answerRecoil]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setAnswer(answerRecoil);
            setIsSaved(true);
            return;
        }
        setIsSaved(false);

        setAnswer(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (isSaved) {
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
        setIsSaved(true)
    }, [answer]);

    useEffect(() => {
        if (!props.setStates) {
            return;
        }


        if (isSaved) {
            props.setStates([DialogueItemStateType.NoErrors])
            return;
        }

        props.setStates([DialogueItemStateType.UnsavedChanges])
    }, [isSaved]);

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
                ? <LinarProgressCustom name="Deleting"/>
                : null
            }


            
            {/* <TensesList tensesList={answer.tensesList} setTensesList={onSetTenses} /> */}

            <EquivalentTextConstructor
                onChangeEquivalentAnswer={onChangeEquivalentAnswer}
                onAddEquivalentAnswer={onAddEquivalentAnswer}
                onRemoveEquivalentAnswer={onRemoveEquivalentAnswer}
                texts={answer.texts}
            />

            <DevidedLabel name="Words Hints"/>

            <TextField
                InputLabelProps={{ shrink: true }}
                placeholder="Hello, You, Meet, etc."
                value={answer.wordsToUse}
                id="outlined-basic"
                label="Words to use"
                variant="outlined"
                onChange={onWordsToUseChange}
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

            {!isSaved
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
                ? <LinarProgressCustom name="Creating"/>
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
                                sx={{ m: 1, }}>{phrase.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }
        </Box>
    )
}

