import { Alert, Box, Button, ButtonGroup, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList";
import AddButton from "../../components/buttons/AddButton";
import SaveButton from "../../components/buttons/SaveButton";
import { useSelection } from "../../Data/useSelection";
import { useAnswer, useDialogueItemConstructor } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
import MistakeExplanationConstructor from "./MistakeExplanationsConstructor";
import TranslateConstructor from "./TranslateConstructor";
import IAnswerError from "../../Data/Errors/IAnswerError";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import { LanguageType } from "../../Data/LanguageType";
import AppBarCustom from "../../components/AppBarCustom";
import { v4 as uuidv4 } from 'uuid';
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor";
import ITranslateModel from "../../ThereGame.Business/Models/ITranslateModel";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    prevConstructorId?: string
}

export default function AnswerContructor(props: IAnswerContructor): JSX.Element | null {

    const answerRecoil = useAnswer(props.dialogueId, props.id);
    const answerQueriesApi = useAnswerQueriesApi();

    const [selection, setSelection] = useSelection();
    const [answer, setAnswer] = useState<IAnswerModel>(answerRecoil);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<IAnswerError>();

    function onAddButtonClick() {
        //TODO: To implement
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
        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={event.target.id} prevConstructorId={props.prevConstructorId} />);
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


     // QueriesApi
     const onDelete = async () => {
        await answerQueriesApi.delete(props.id)
            setIsSaved(true)
    }

    const onSave = async() => {
        setIsLoading(true);
        await answerQueriesApi.update(answer)
        setIsLoading(false);
    }

    // Errors
    const checkErrors = () => {
        var currentErrors = {
            text: false,
            translate: false,
            wordsToUse: false,
            mistakeExplanations: [{
                id: "",
                word: false,
                explanation: false,
            }]
        }

        if (answer.text == '') {
            currentErrors.text = true;
        }
        if (answer.wordsToUse == '') {
            currentErrors.wordsToUse = true;
        }

        var explanationHasError = false;
        // answerForm.explanations.forEach(mistakeExplanation => {

        //     if (mistakeExplanation.word == '' ||
        //         mistakeExplanation.text == '') {

        //         var error = {
        //             id: mistakeExplanation.id,
        //             word: mistakeExplanation.word == '',
        //             explanation: mistakeExplanation.text == ''
        //         }

        //         currentErrors.mistakeExplanations.push(error);

        //         explanationHasError = true;
        //     }
        // });
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
        if(JSON.stringify(answerRecoil) !== data){
            return;
        }

        localStorage.removeItem(props.id);
        setIsSaved(true)
    }, [answer]);

    const reset = () => {
        setAnswer(answerRecoil);
        setIsSaved(true);

        localStorage.removeItem(props.id);
    }

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
            <AppBarCustom
                name='Answer Constructor'
                onDelete={onDelete}
            />

            <TensesList tensesList={answer.tensesList} setTensesList={onSetTenses} />

            <TextField
                InputLabelProps={{ shrink: true }}
                placeholder="Yes, today is a greate day!"
                value={answer.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={onChangeText}
                required={true}
                fullWidth
            />

            <TextField
                InputLabelProps={{ shrink: true }}
                value={answer.wordsToUse}
                placeholder="Yes, Greate, Yes, Today, Day, Is, etc."
                id="outlined-basic"
                label="Words To Use"
                variant="outlined"
                onChange={onWordsToUseChange}
                required={true}
                fullWidth
            />

            <TranslateConstructor 
                translates={answer.translates} 
                onAddTranslate={onAddTranslate}
                onDeleteTranslate={onDeleteTranslate}
                onTranslateChange={onTranslateChange}
            />

           <MistakeExplanationConstructor 
                explanations={answer.mistakeExplanations} 
                onDeleteMistakeExplanation={onDeleteMistakeExplanation} 
                onExplanationChange={onExplanationChange}
                onAddMistakeExplanation={onAddMistakeExplanation}
            />

            <AddButton onCLick={onAddButtonClick} />

            {answer.phrases?.length != 0
                ?
                <Box>
                    <div>Next phrases to the answer</div>
                    <ButtonGroup
                    >
                        {answer.phrases?.map(answer => (
                            <Button id={answer.id} onClick={onPhraseButtonClick} sx={{ p: 1, }}>{answer.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }


            {!isSaved
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            }

            <SaveButton onClick={onSave} isLoading={isLoading} />
        </Box>
    )
}

