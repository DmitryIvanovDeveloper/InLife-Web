import { Button } from "@mui/material";
import React from "react";
import { useDialogues } from "../../Data/useDialogues.ts";

export interface ISaveButton {
    onClick: () => void;
}
export default function SaveButton(props) {
    const dialogues = useDialogues();

    return (
        <Button fullWidth={false} onClick={props.onClick} color="primary" sx={ { borderRadius: 28 } }>Save</Button>
    )
}