import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useDialogue, useDialogueItemConstructor } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor.tsx";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel.ts";
import useDialogieQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi.ts";

export interface IDialogueConstructor {
    id: string;
}

export default function DialogueConstructor(props: IDialogueConstructor) {

    const dialogue = useDialogue(props.id);
    const [dialogueForm, setDialogueForm] = useState<IDialogueModel>(dialogue);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);

    const dialogieQueriesApi = useDialogieQueriesApi();
    
    const save = async () => {
        await dialogieQueriesApi.update(dialogueForm).then(() => {
            setIsSaved(true);
            reset();
        });
    }

    const onChange = (event) => {
        setDialogueForm(prev => ({
            ...prev,
            name: event.target.value
        }));

        setIsSaved(false);
    }

    const onDelete = async () => {
        await dialogieQueriesApi.delete(props.id);
    }

    const onClickPhrase = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.id} id={dialogueForm.phrase.id} />);
    }

    const publish = async () => {
        setDialogueForm(prev => ({
            ...prev,
            isPublished: !prev.isPublished
        }));

        setIsSaved(false);
    }

    const reset = ()  => {
        setDialogueForm(dialogue);
        setIsSaved(true);
        localStorage.removeItem(props.id);
    }

    useEffect(() => {
        if (isSaved) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(dialogueForm));

    }, [dialogueForm]);

    return (
        <Box 
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5
            }}
            autoComplete="off"
        >
            <Button  
                variant="contained"
                onClick={publish}
            >
                {dialogueForm.isPublished ? "Unpublish" : "Publish"}
            </Button>
            
            <DeleteButton onClick={onDelete}/>
            <TextField 
                onChange={onChange} 
                value={dialogueForm.name}
                required={true}
                id="outlined-basic"
                label="Name"
                variant="outlined"
            ></TextField>
            <SaveButton onClick={save}/>
            <Box>
                <Button 
                    variant="contained" 
                    onClick={onClickPhrase}>{dialogueForm.phrase.text}
                </Button>
            </Box>

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