import { Alert, Box, Button, ButtonGroup, CardHeader, FormLabel, ImageListTypeMap, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/buttons/AddButton.tsx";
import IPhraseModel from "../../ThreGame.Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import IAnswerModel from "../../ThreGame.Business/Models/IAnswerModel.ts";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import AnswerContructor from "../answerContructor/AnswerConstrutcor.tsx";
import { useAnswerCrud, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import ThereGameWebApi from "../../ThereGame.Api/ThereGameWebApi.ts";

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

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const [phraseForm, setPhraseForm] = useState<IPhraseModel>(phraseRecoil);
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
            translate: ""
        }

        answerCrud.add(newPhrase);
    }

    const onDelete = () => {
        new ThereGameWebApi().Remove(props.id)
            .then(() => {
                //TODO: Implement to open the previous <AnswerConstructor>
            });
    }

    const onAnswerButtonClick = (id: string) => {
        setSelection(id);
        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={id} prevConstructorId={props.id} />);
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
        new ThereGameWebApi().Add(phraseForm)
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

        setIsSaved(false);
    }

    useEffect(() => {

        var data = localStorage.getItem(props.id);
        if (data == null) {
            setPhraseForm(phraseRecoil);
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
        setPhraseForm(phraseRecoil);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }

    if (!phraseRecoil) {
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
                
                <Typography  textAlign="center">Phrase Constructor</Typography>
            </Box>

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
                    
                        {phraseForm.answers.map(answer => (
                            <Button id={answer.id} onClick={() => onAnswerButtonClick(answer.id)} sx={{ p: 1, }}>
                                <Typography sx={{textDecoration: 'underline'}}>{answer.text}</Typography>
                            </Button>
                        ))}
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