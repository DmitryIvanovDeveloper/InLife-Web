import { Button } from "@mui/material";
import React from "react";
import { useDialogues } from "../../Data/useDialogues.ts";

export interface ISaveButton {
    onClick: () => void;
}
export default function SaveButton(props) {
    const dialogues = useDialogues();

    const onClick = (event) => {
        localStorage.setItem("Dialogues", JSON.stringify(dialogues));
    }

    return (
        <Button onClick={onClick} color="primary" sx={ { borderRadius: 28 } }>Save</Button>
    )
}