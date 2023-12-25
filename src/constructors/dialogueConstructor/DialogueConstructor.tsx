import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SaveButton from "../../components/buttons/SaveButton";
import { useDialogue, useDialogueItemConstructor } from "../../Data/useDialogues";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import useDialogieQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor";
import VoiceList from "../../components/voiceList/VoiceList";
import AppBarDeleteButton from "../../components/AppBarDeleteButton";

export interface IDialogueConstructor {
    id: string;
}

export default function DialogueConstructor(props: IDialogueConstructor): JSX.Element | null {
    const dialogueRecoil = useDialogue(props.id);
    const [dialogue, setDialogue] = useState<IDialogueModel>(dialogueRecoil);
    const [isVoiceSelected, setIsVoiceSelected] = useState<boolean>(dialogueRecoil.isVoiceSelected);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dialogieQueriesApi = useDialogieQueriesApi();

    const save = async () => {
        setIsLoading(true)
        await dialogieQueriesApi.update(dialogue)
        setIsLoading(false)
        setIsSaved(true);

        reset();
    }

    const onDelete = async () => {
        await dialogieQueriesApi.delete(props.id);
    }

    const onChangeName = (event: any) => {
        setDialogue(prev => ({
            ...prev,
            name: event.target.value
        }));

        setIsSaved(false);
    }

    const onClickPhrase = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.id} id={dialogue.phrase.id} />);
    }

    const publish = async () => {
        setDialogue(prev => ({
            ...prev,
            isPublished: !prev.isPublished
        }));

        setIsSaved(false);
    }

    const reset = () => {
        localStorage.removeItem(props.id);
    }

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setDialogue(dialogueRecoil);
            setIsSaved(true);
            return;
        }

        setIsSaved(false);

        setDialogue(JSON.parse(data));
    }, [dialogueRecoil]);

    useEffect(() => {
        if (isSaved) {
            return;
        }

        if (JSON.stringify(dialogueRecoil) !== JSON.stringify(dialogue)) {
            localStorage.setItem(props.id, JSON.stringify(dialogue));
            return;
        }
        
        localStorage.removeItem(props.id);
        setIsSaved(true)
    }, [dialogue]);

    useEffect(() => {
        setDialogue(prev => ({
            ...prev,
            isVoiceSelected
        }))
    }, [isVoiceSelected]);
    

    if (!dialogue) {
        return null;
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
            <AppBarDeleteButton
                name={`"${dialogue.name}" Settings`}
                onDelete={onDelete}
            />

            <VoiceList 
                dialogueId={props.id} 
                setIsVoiceSelected={setIsVoiceSelected} 
                isVoiceSelected={dialogueRecoil.isVoiceSelected}
            />
            
            <Button
                onClick={publish}
                variant={dialogue.isPublished ? "contained" : "outlined"}
            >
                {dialogue.isPublished ? "Publish" : "Not publish"}
            </Button>

            <TextField
                onChange={onChangeName}
                value={dialogue.name}
                required={true}
                id="outlined-basic"
                label="Name"
                variant="outlined"
            />

            <SaveButton onClick={save} isLoading={isLoading} />
            
            <Box>
                <Button
                    disabled={!dialogueRecoil.isVoiceSelected}
                    variant="contained"
                    onClick={onClickPhrase}>{dialogue.phrase.text}
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