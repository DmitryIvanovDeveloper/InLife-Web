import { Tabs, Tab } from "@mui/material";
import { IDialogueModel } from "../ThereGame.Business/Models/IDialogueModel";

export interface IDialogueTabsProps {
    dialogues: IDialogueModel[];
    onClick: (dialogue: IDialogueModel) => void;
    dialogue: IDialogueModel | null;
}

export default function DialoguesTab(props: IDialogueTabsProps) {
    
    return (
        <Tabs
            value={props.dialogue?.name}
            onChange={() => {}}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            {props.dialogues.map(dialogue => (
                <Tab onClick={() => props.onClick(dialogue)} value={dialogue.name ?? "New dialogue"} label={dialogue.name } />
            ))}
        </Tabs>
    )
}