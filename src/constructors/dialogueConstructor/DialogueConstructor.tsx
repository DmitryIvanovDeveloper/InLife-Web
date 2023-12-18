import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useDialogue, useDialogueItemConstructor } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor.tsx";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel.ts";
import useDialogieQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi.ts";
import LocationCarousel from "../../components/LocationCarousel/LocationCarousel.js";
import { Locations } from "../../Data/Locations.ts";

export interface IDialogueConstructor {
    id: string;
}

export default function DialogueConstructor(props: IDialogueConstructor) {

    const dialogueRecoil = useDialogue(props.id);
    const [dialogue, setDialogue] = useState<IDialogueModel>(dialogueRecoil);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isSaved, setIsSaved] = useState(true);

    const dialogieQueriesApi = useDialogieQueriesApi();
    
    const save = async () => {
        await dialogieQueriesApi.update(dialogue)
        setIsSaved(true);
        reset();
    }

    const onChange = (event) => {
        setDialogue(prev => ({
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

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.id} id={dialogue.phrase.id} />);
    }

    const publish = async () => {
        setDialogue(prev => ({
            ...prev,
            isPublished: !prev.isPublished
        }));

        setIsSaved(false);
    }

    const reset = ()  => {
        setDialogue(dialogueRecoil);
        setIsSaved(true);

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
    }, []);

    useEffect(() => {
        if (isSaved) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(dialogue));

    }, [dialogue]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if(JSON.stringify(dialogueRecoil) !== data){
            return;
        }

        localStorage.removeItem(props.id);
        setIsSaved(true)
    }, [dialogue]);

    const onSetLevel = (levelId: string) => {
        setDialogue(prev => ({
            ...prev,
            levelId: levelId
        }));

        setIsSaved(false);
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
            <Box style={{display: "flex", justifyContent: "space-between"}} >
                <Box></Box>
                <Typography>
                    {
                        Locations.find(location => location.id == dialogue.levelId)?.name
                    }
                </Typography>
                <DeleteButton onClick={onDelete}/>
            </Box>
         

            <LocationCarousel setLevel={onSetLevel}/>

            <Button  
                variant="contained"
                onClick={publish}
            >
                {dialogue.isPublished ? "Unpublish" : "Publish"}
            </Button>
            
            <TextField 
                onChange={onChange} 
                value={dialogue.name}
                required={true}
                id="outlined-basic"
                label="Name"
                variant="outlined"
            ></TextField>
            <SaveButton onClick={save}/>
            <Box>
                <Button 
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