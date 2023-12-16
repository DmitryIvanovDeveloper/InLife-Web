import { Alert, Box, Button, ButtonGroup, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/buttons/AddButton.tsx";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor.tsx";
import { usePhraseCrud, useAnswer, useDialogueItemConstructor } from "../../Data/useDialogues.ts";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel.ts";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import MistakeExplanationConstructor from "./MistakeExplanationsConstructor.tsx";
import TranslateConstructor from "./TranslateConstructor.tsx";
import IAnswerError from "../../Data/Errors/IAnswerError.tsx";
import { appContainer } from "../../inversify.config.ts";
import { TYPES } from "../../types.ts";
import IThereGameDataService from "../../ThereGame.Business/Domain/Util/Services/IThereGameDataService.ts";
import ITranstateModel from "../../ThereGame.Business/Models/ITranslateModel.ts";
import { LanguageType } from "../../ThereGame.Business/Models/LanguageType.ts";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    prevConstructorId?: string
}

export default function AnswerContructor(props: IAnswerContructor) {
    const thereGameDataService = appContainer.get<IThereGameDataService>(TYPES.ThereGameDataService);

    const phraseCrud = usePhraseCrud(props.dialogueId, props.id);

    const answer = useAnswer(props.dialogueId, props.id);

    const [selection, setSelection] = useSelection();
    const [answerForm, setAnswerForm] = useState<IAnswerModel>(answer);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);
    const [errors, setErrors] = useState<IAnswerError>();

    function onAddButtonClick() {
      
    }

    const onChangeText = (event) => {
        setAnswerForm(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsSaved(false);
    }

    const onPhraseButtonClick = (event) => {
        setSelection(event.target.id);
        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={event.target.id} prevConstructorId={props.prevConstructorId} />);
    }

    const onWordsToUseChange = (event) => {
        setAnswerForm(prev => ({
            ...prev,
            wordsToUse: event.target.value
        }));
        setIsSaved(false);
    }

   

    // Mistake Explanation
    const onExplanationChange = (event, index) => {
        var explanation = [...answerForm.mistakeExplanations];

        if (event.target.id == 'word') {
            explanation[index].word = event.target.value;
        }
        if (event.target.id == 'mistake explanation') {
            explanation[index].text = event.target.value;
        }

        setAnswerForm(prev => ({
            ...prev,
            mistakeExplanations: explanation
        }));
    }

    const onAddMistakeExplanation = () => {
        const mistakeExplanation: IMistakeExplanationModel = {
            parentId:  props.id,
            word: "",
            text: "",
            id: uuidv4()
        }
        
        setAnswerForm(prev => ({
            ...prev,
            mistakeExplanations: [
                ...prev.mistakeExplanations,
                mistakeExplanation
            ]
        }));

        setIsSaved(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        setAnswerForm(prev => ({
            ...prev,
            mistakeExplanations: [...answerForm.mistakeExplanations]
                .filter(explanation => explanation.id != id)
        }));
    }

    // Translate
    const onAddTranslate = () => {
        var translate: ITranstateModel = {
            parentId: props.id,
            id: uuidv4(),
            language: LanguageType.Russian,
            text: ""
        }

        setAnswerForm(prev => ({
            ...prev,
            translates: [...answerForm.translates, translate]
        }));
    }
    
    const onDeleteTranslate = (id: string) => {
        setAnswerForm(prev => ({
            ...prev,
            translates: [...answerForm.translates]
                .filter(translate => translate.id != id)
        }));
    }

    const onTranslateChange = (value: string) => {
        setAnswerForm(prev => ({
            ...prev,
            translate: value
        }));
        setIsSaved(false);
    }

    useEffect(() => {
        console.log(answerForm.translates);
    }, [answerForm]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (data == null) {
            setAnswerForm(answer);
            setIsSaved(true);
            return;
        }
        setIsSaved(false);

        setAnswerForm(JSON.parse(data));
    }, []);

    const onDelete = () => {
       
    }

    const onSave = () => {
       thereGameDataService.Add(answerForm)
            .then(() => setIsSaved(true));
    }


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

        if (answerForm.text == '') {
            currentErrors.text = true;
        }
        if (answerForm.wordsToUse == '') {
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

    const onSetTenses = (tenses: string[]) => {
        setAnswerForm(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsSaved(false)
    }

    useEffect(() => {
        if (isSaved) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(answerForm));
    }, [answerForm]);

    const reset = () => {
        setAnswerForm(answer);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }

    if (!answer) {
        return;
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
                height: 700,
                overflow: "hidden",
                overflowY: "scroll",
            }}
            noValidate
            autoComplete="off"


        >
            <DeleteButton onClick={onDelete} />

            <Box sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
                color="primary">

                <Typography textAlign="center">Answer Constructor</Typography>
            </Box>


            <TensesList tensesList={answerForm.tensesList} setTensesList={onSetTenses} />

            <TextField
                InputLabelProps={{ shrink: true }}
                placeholder="Yes, today is a greate day!"
                value={answerForm.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={onChangeText}
                required={true}
                fullWidth
            />

            <TextField
                InputLabelProps={{ shrink: true }}
                value={answerForm.wordsToUse}
                placeholder="Yes, Greate, Yes, Today, Day, Is, etc."
                id="outlined-basic"
                label="Words To Use"
                variant="outlined"
                onChange={onWordsToUseChange}
                required={true}
                fullWidth
            />

            <TranslateConstructor 
                translates={answerForm.translates} 
                onAddTranslate={onAddTranslate}
                onTranslateChange={onTranslateChange} 
                onDeleteTranslate={onDeleteTranslate}
            />

           <MistakeExplanationConstructor 
                explanations={answerForm.mistakeExplanations} 
                onDeleteMistakeExplanation={onDeleteMistakeExplanation} 
                onExplanationChange={onExplanationChange}
                onAddMistakeExplanation={onAddMistakeExplanation}
            />

            <AddButton onCLick={onAddButtonClick} />

            {answerForm.phrases?.length != 0
                ?
                <Box>
                    <div>Next phrases to the answer</div>
                    <ButtonGroup
                    >
                        {answerForm.phrases?.map(answer => (
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

            <SaveButton onClick={onSave} />
        </Box>
    )
}

