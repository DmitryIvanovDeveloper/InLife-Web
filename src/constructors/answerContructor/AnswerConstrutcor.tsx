import { Alert, Box, Button, ButtonGroup, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/buttons/AddButton.tsx";
import IPhraseModel from "../../ThreGame.Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import PhraseContructor from "../phrazeContructor.tsx/PhrazeContructor.tsx";
import { usePhraseCrud, useAnswer, useDialogueItemConstructor } from "../../Data/useDialogues.ts";
import IAnswerModel from "../../ThreGame.Business/Models/IAnswerModel.ts";
import { IExplanationModel } from "../../ThreGame.Business/Models/ExplanationModel.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import ThereGameWebApi from "../../ThereGame.Api/ThereGameWebApi.ts";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    prevConstructorId?: string
}

export default function AnswerContructor(props: IAnswerContructor) {
    const phraseCrud = usePhraseCrud(props.dialogueId, props.id);

    const answer = useAnswer(props.dialogueId, props.id);

    const [selection, setSelection] = useSelection();
    const [answerForm, setAnswerForm] = useState<IAnswerModel>(answer);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);

    function onAddButtonClick() {
        var phrase: IPhraseModel = {
            text: "New Phrase",
            answers: [],
            tensesList: [],
            comments: "",
            id: uuidv4(),
            parentId: props.id
        }

        phraseCrud.add(phrase);
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

    const onTranslateChange = (event) => {
        setAnswerForm(prev => ({
            ...prev,
            translate: event.target.value
        }));
        setIsSaved(false);
    }

    const onExplanationChange = (event, index) => {
        var explanation = [...answerForm.explanations];

        if (event.target.id == 'word') {
            explanation[index].word = event.target.value;
        }
        if (event.target.id == 'mistake explanation') {
            explanation[index].text = event.target.value;
        }

        setAnswerForm(prev => ({
            ...prev,
            explanations: explanation
        }));
    }

    const onAddMistakeExplanation = () => {
        const mistakeExplanation: IExplanationModel = {
            word: "",
            text: "",
            id: uuidv4()
        }

        setAnswerForm(prev => ({
            ...prev,
            explanations: [
                ...prev.explanations,
                mistakeExplanation
            ]
        }));

        setIsSaved(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        
        var explanations = [...answerForm.explanations]
            .filter(explanation => explanation.id != id);

            console.log(id)
            console.log(explanations)
        setAnswerForm(prev => ({
            ...prev,
            explanations
        }));
    }

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
        new ThereGameWebApi()
            .Remove(props.id)
            .then(() => {
                //TODO: Implement to open the previous <PhraseConstructor>
            });
    }

    const onSave = () => {
        new ThereGameWebApi().Add(answerForm)
            .then(() => setIsSaved(true));
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
       
    useEffect(() => {
        console.log(answer);
    }, []);

    const reset = () => {
        setAnswerForm(answer);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }

    if(!answer) {
        return;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5
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
                
                <Typography  textAlign="center">Answer Constructor</Typography>
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
                fullWidth
            />
             <TextField
                InputLabelProps={{ shrink: true }}
                value={answerForm.translate}
                placeholder="Да, сегодня отличный день!"
                id="outlined-basic"
                label="Translate"
                variant="outlined"
                onChange={onTranslateChange}
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
                fullWidth
            />
            {answerForm.explanations.map((explanation, id) => (
                <Grid
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={explanation.word}
                        id="word"
                        label="Word"
                        placeholder="are"
                        variant="outlined"
                        onChange={(event) => onExplanationChange(event, id)}
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ pl: 0.5, width: "74%" }}
                        value={explanation.text}
                        id="mistake explanation"
                        label="Mistake Explanation"
                        placeholder="are - множественное число, день - используется в единственном числе"
                        variant="outlined"
                        onChange={(event) =>  onExplanationChange(event, id)}
                        fullWidth
                    />
                     <Button onClick={() => onDeleteMistakeExplanation(explanation.id)}>Delete</Button>
                </Grid>
            ))}

            <Button style={{backgroundColor: "darkgreen", color: "white"}} onClick={onAddMistakeExplanation}>Add mistake explanation</Button>

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

