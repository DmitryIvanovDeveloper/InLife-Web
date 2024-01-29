import { Box } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import TextButton from "../components/Button/TextButton";
import { useDialogue, useDialogueItemConstructor } from "../Data/useDialogues";
import DialogueConstructor from "../Constructors/DialogueConstructor/DialogueConstructor";
import Phrase from "./Phrase";
import { DialogueItemStateType } from "../ThereGame.Business/Util/DialogueItemStateType";
import { useState } from "react";

export interface IDialogueProps {
    id: string,
}
export default function Dialogue(props: IDialogueProps) {

    var dialogueRecoil = useDialogue(props.id);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [states, setStates] = useState<DialogueItemStateType[]>([DialogueItemStateType.NoErrors]);

    const onClick = (id: string) => {
        setDialogueItemConstructor(() => <DialogueConstructor id={id} setStates={setStates}/>);
    }
    
    if (!dialogueRecoil) {
        return
    }

    return (
        <Box>
            <TextButton onClick={() => onClick(props.id)}>
                <TreeItem
                    key={props.id}
                    nodeId={dialogueRecoil.id}
                    style={{color: states[0] == DialogueItemStateType.UnsavedChanges ? "#e65100":  "blue"}} 
                    label={`${!dialogueRecoil.name ? "New Dialogue" : dialogueRecoil.name} [D]`}
                >
                    {dialogueRecoil.voiceSettings
                        ? <Phrase
                            dialogueId={dialogueRecoil.id}
                            id={dialogueRecoil.phrase.id}
                            parentId={dialogueRecoil.id}
                        />
                        : null
                    }

                </TreeItem>
            </TextButton>
        </Box>
    )
}