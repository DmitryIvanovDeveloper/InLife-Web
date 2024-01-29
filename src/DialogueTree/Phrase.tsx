import { Box, Grid } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useDialogueItemConstructor, usePhrase } from "../Data/useDialogues";
import TextButton from "../components/Button/TextButton";
import Answer from "./Answer";
import PhraseContructor from "../Constructors/PhraseContructor/PhraseContructor";
import { useState } from "react";
import { DialogueItemStateType } from "../ThereGame.Business/Util/DialogueItemStateType";

export interface IPhraseProps {
    dialogueId: string;
    parentId: string
    id: string;
}

export default function Phrase(props: IPhraseProps): JSX.Element | null {
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [states, setStates] = useState<DialogueItemStateType[]>([DialogueItemStateType.NoErrors]);

    function OnClick(event: any) {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor 
            dialogueId={props.dialogueId} 
            id={phraseRecoil.id}
            parentId={props.parentId}
            setStates={setStates}
        />);
    }

    if (!phraseRecoil) {
        return null;
    }

    return (
        <Box display="flex">
            <TextButton onClick={OnClick}>
                
                <TreeItem
                    key={phraseRecoil.id}
                    nodeId={phraseRecoil.id}
                    itemType="Phrase"
                    label={`${!phraseRecoil.text ? "New Phrase" : phraseRecoil.text} [P]`}
                    style={{color: states[0] == DialogueItemStateType.UnsavedChanges ? "#e65100":  "#9c27b0"}} 
                >
                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column"
                        }}

                    >
                        {phraseRecoil.answers.map(answer => (
                            <Answer key={answer.id} dialogueId={props.dialogueId} id={answer.id} parentId={props.id}/>
                        ))}
                    </Grid>
                </TreeItem>
            </TextButton>

        </Box>
    )
}