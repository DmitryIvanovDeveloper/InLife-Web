import { Alert, Box, Button, ButtonGroup, CardHeader, FormLabel, ImageListTypeMap, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/buttons/AddButton.tsx";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel.ts";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import AnswerContructor from "../answerContructor/AnswerConstructor.tsx";
import { useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi.ts";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi.ts";
import AppBarCustom from "../../components/AppBarCustom.tsx";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    prevConstructorId?: string
}

export default function PhraseContructor(props: IPhraseConstructor) {
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isSaved, setIsSaved] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        text: false
    });

    const onAddButtonClick = async () => {
        await answerQueriesApi.create(props.id);
    }

    // QueryApi
    const onSave = async () => {
        if (phrase.text == '') {
            setErrors(prev => ({
                ...prev,
                text: true
            }));

            return;
        }

        setIsLoading(true);
        await phraseQueriesApi.update(phrase);
        setIsLoading(false);

        localStorage.removeItem(props.id);
        setIsSaved(true);
    }

    const onDelete = async () => {
        await phraseQueriesApi.delete(props.id);
    }

    const reset = ()  => {
        setPhrase(phraseRecoil);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }


    const onAnswerButtonClick = (id: string) => {
        setSelection(id);
        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={id} prevConstructorId={props.id} />);
    }

    const onChangeText = (event) => {
        setPhrase(prev => ({
            ...prev,
            text: event.target.value
        }));
    
        setErrors(prev => ({
            ...prev,
            text: false
        }));

        setIsSaved(false);
    }

    const onCommentsChange = (event) => {
        setPhrase(prev => ({
            ...prev,
            comments: event.target.value
        }));
        setIsSaved(false);
    }

    

    const onSetTenses = (tenses: string[]) => {
        setPhrase(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsSaved(false);
    }


    // UseEffects

    useEffect(() => {
        setPhrase(phraseRecoil);
    }, [phraseRecoil])

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setPhrase(phraseRecoil);
            setIsSaved(true);
            return;
        }
        setIsSaved(false);

        setPhrase(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (isSaved) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(phrase));

    }, [phrase]);


    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if(JSON.stringify(phraseRecoil) !== data){
            return;
        }

        localStorage.removeItem(props.id);
        setIsSaved(true)
    }, [phrase]);

    if (!phrase) {
        return;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5.
                
            }}
            style={{height:"1000px", overflow: "auto"}}
            autoComplete="off"
        >
            <AppBarCustom
                name='Answer Constructor'
                onDelete={onDelete}
            />

            <TensesList tensesList={phrase.tensesList} setTensesList={onSetTenses} />
            
            <TextField
                InputLabelProps={{ shrink: true }}

                value={phrase.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={onChangeText}
                required={true}
                placeholder="Hello, my name is John"
                fullWidth
                error={errors.text}
            />
            <TextField
                InputLabelProps={{ shrink: true }}
                value={phrase.comments}
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                onChange={onCommentsChange}
                fullWidth
            />

            <AddButton onCLick={onAddButtonClick} />

            {phrase.answers.length != 0
                ?
                <Box>
                    <div>Answers to the phrase</div>
                    
                        {phrase.answers.map(answer => (
                            <Button id={answer.id} onClick={() => onAnswerButtonClick(answer.id)} sx={{ p: 1, }}>
                                <Typography sx={{textDecoration: 'underline'}}>{answer.text}</Typography>
                            </Button>
                        ))}
                </Box>
                : null
            }

            <SaveButton onClick={onSave} isLoading={isLoading}/>
            
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