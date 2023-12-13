import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useDialogue } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import ThereGameWebApi from "../../ThereGame.Api/ThereGameWebApi.ts";
import { IDialogueModel } from "../../ThreGame.Business/Models/IDialogueModel.ts";
import { v4 as uuidv4 } from 'uuid';

export interface IDialogueConstructor {
    id: string;
}

export default function DialogueConstructor(props: IDialogueConstructor) {
    const dialogue = useDialogue(props.id);

    const [dialogueForm, setDialogueForm] = useState(dialogue);

    const save = async () => {
        var id = uuidv4();
        var newDialogue: IDialogueModel = {
            id: id,
            name: "",
            phrase: {
                parentId: id,
                text: "",
                answers: [],
                tensesList: [],
                comments: "",
                id: uuidv4(),
            }
        }
        await new ThereGameWebApi().CreateDialogue(newDialogue);
    }

    const onChange = (event) => {

        setDialogueForm(prev => ({
            ...prev,
            name: event.target.value
        }));
    }

    const onDelete = async () => {
        // await new Database.Remove(props.id)
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
            <Button onClick={save}>Save</Button>
        </Box>
    )
}