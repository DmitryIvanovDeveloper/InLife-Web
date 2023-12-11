import { Alert, Box, Button, ButtonGroup, CardHeader, FormLabel, ImageListTypeMap, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/AddButton.tsx";
import IPhraseModel from "../../../Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import IAnswerModel from "../../../Business/Models/IAnswerModel.ts";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import AnswerContructor from "../answerContructor/AnswerConstrutcor.tsx";
import { useAnswerCrud, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues.ts";
import Database from "../../Infrastructure/Database/Databse.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    prevConstructorId?: string
}

var a: IPhraseModel = {
    parentId: "",
    text: "",
    answers: [],
    tensesList: [],
    comments: "",
    id: ""
}

export default function PhraseContructor(props: IPhraseConstructor) {

    const answerCrud = useAnswerCrud(props.dialogueId, props.id);
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const phrase = usePhrase(props.dialogueId, props.id);
    const [phraseForm, setPhraseForm] = useState<IPhraseModel>(phrase);
    const [isSaved, setIsSaved] = useState(true);

    function onAddButtonClick() {
        var newPhrase: IAnswerModel = {
            text: "New Answer",
            id: uuidv4(),
            tensesList: [],
            wordsToUse: [],
            explanations: [],
            phrases: [],
            parentId: props.id,
        }

        answerCrud.add(newPhrase);
    }


    const onDelete = () => {
        new Database().Remove(props.id)
            .then(() => {
                //TODO: Implement to open the previous <AnswerConstructor>
            });
    }

    const onAnswerButtonClick = (event) => {
        setSelection(event.target.id);
        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={event.target.id} prevConstructorId={props.id} />);
    }

    const onChangeText = (event) => {
        setPhraseForm(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsSaved(false);
    }

    const onCommentsChange = (event) => {
        setPhraseForm(prev => ({
            ...prev,
            comments: event.target.value
        }));
        setIsSaved(false);
    }

    const onSave = () => {
        new Database().Add(phraseForm)
            .then(() => {
                setIsSaved(true);
                localStorage.removeItem(props.id);
            });
    }

    const onSetTenses = (tenses: string[]) => {
        setPhraseForm(prev => ({
            ...prev,
            tensesList: tenses
        }));
    }

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (data == null) {
            setPhraseForm(phrase);
            setIsSaved(true);
            return;
        }
        setIsSaved(false);

        setPhraseForm(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (isSaved) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(phraseForm));

    }, [phraseForm]);

    const reset = ()  => {
        setPhraseForm(phrase);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }

    if (!phrase) {
        return;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5
            }}
            
            autoComplete="off"
        >
            <Typography>PHRASE</Typography>

            <DeleteButton onClick={onDelete} />

            <TensesList tensesList={phraseForm.tensesList} setTensesList={onSetTenses} />
            
            <TextField
                value={phraseForm.text}
                id="outlined-basic"
                label="Phrase"
                variant="outlined"
                onChange={onChangeText}
                required={true}
                placeholder="Phrase"
                fullWidth
            />
            <TextField
                value={phraseForm.comments}
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                onChange={onCommentsChange}
                fullWidth
            />

            <AddButton onCLick={onAddButtonClick} />

            {phraseForm.answers.length != 0
                ?
                <Box>
                    <div>Answers to the phrase</div>
                    <ButtonGroup
                    >
                        {phraseForm.answers.map(answer => (
                            <Button id={answer.id} onClick={onAnswerButtonClick} sx={{ p: 1, }}>{answer.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }

            <SaveButton onClick={onSave} />

            
            {!isSaved
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset</Button>
                 </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            }
        </Box>
    )
}