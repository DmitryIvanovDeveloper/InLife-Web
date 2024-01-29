import { Tab, Tabs } from "@mui/material";
import { IDialogueModel } from "../ThereGame.Business/Models/IDialogueModel";
import { useEffect } from "react";

export interface IDialogueTabsProps {
    dialogues: IDialogueModel[];
    onClick: (dialogue: IDialogueModel) => void;
    dialogue: IDialogueModel | null;
}

export default function DialoguesTab(props: IDialogueTabsProps) {
    return (
        <Tabs
            value={props.dialogue?.id}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            {props.dialogues.map(dialogue => (
                <Tab onClick={() => props.onClick(dialogue)} value={dialogue.id} label={!dialogue.name ? "New dialogue" : dialogue.name } />
            ))}
        </Tabs>
    )
}