import React from "react"
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Answer from "./Answer.tsx";
import { Box, Grid } from "@mui/material";
import TextButton from "../components/buttons/TextButton.tsx";
import PhraseContructor from "../constructors/phrazeContructor.tsx/PhrazeContructor.tsx";
import { useDialogueItemConstructor, usePhrase } from "../Data/useDialogues.ts";

export interface IPhraseProps {
    dialogueId: string;
    id: string;
}

export default function Phrase(props: IPhraseProps) {

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const phrase = usePhrase(props.dialogueId, props.id);
    

    function OnClick(event) {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={phrase.id}/>);
    }
    if (!phrase) {
        return;
    }
   
    return (
        <Box display="flex">
            <TextButton onClick={OnClick}>
                <TreeItem key={phrase.id} nodeId={phrase.id} label={`${phrase.text}`}>
                    <Grid sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                        {phrase.answers.map(answer => (
                            <Answer key={answer.id} dialogueId={props.dialogueId} id={answer.id} />
                        ))}
                    </Grid>
                </TreeItem>
            </TextButton>
        </Box>
    )
}