import React from "react"
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Answer from "./Answer.tsx";
import { Box, Grid } from "@mui/material";
import PhraseContructor from "../constructors/phraseContructor.tsx/PhraseContructor.tsx";
import { useDialogueItemConstructor, usePhrase } from "../Data/useDialogues.ts";
import TextButton from "../components/buttons/TextButton.tsx";

export interface IPhraseProps {
    dialogueId: string;
    id: string;
}

export default function Phrase(props: IPhraseProps) {
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    function OnClick(event) {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={phraseRecoil.id} />);
    }

    if (!phraseRecoil) {
        return;
    }

    return (
        <Box display="flex">
            <TextButton onClick={OnClick}>
                <TreeItem
                    key={phraseRecoil.id}
                    nodeId={phraseRecoil.id}
                    itemType="Phrase"
                    label={`${phraseRecoil.text} [P]`}
                    style={{color: "#9c27b0"}} 
                >
                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column"
                        }}

                    >
                        {phraseRecoil.answers.map(answer => (
                            <Answer key={answer.id} dialogueId={props.dialogueId} id={answer.id} />
                        ))}
                    </Grid>
                </TreeItem>
            </TextButton>

        </Box>
    )
}