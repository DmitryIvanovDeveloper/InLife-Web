import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useDialogue } from "../../Data/useDialogues.ts";
import DeleteButton from "../../components/buttons/DeleteButton.tsx";
import ThereGameWebApi from "../../ThereGame.Api/ThereGameWebApi.ts";
import { IDialogueModel } from "../../ThreGame.Business/Models/IDialogueModel.ts";

export interface IDialogueConstructor {
    id: string;
}

export default function DialogueConstructor(props: IDialogueConstructor) {
    const dialogue = useDialogue(props.id);

    const [dialogueForm, setDialogueForm] = useState(dialogue);

    const save = async () => {
        var newDialogue: IDialogueModel = {
            id: "650ew583-07b7-412a-98fe-8ce5c7a239e7",
            name: "",
            phrase: {
                parentId: "650ew583-07b7-412a-98fe-8ce5c7a239e7",
                text: "",
                answers: [],
                tensesList: [],
                comments: "",
                id: "650we583-07b7-412a-98fe-8ce5c5j789e7"
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