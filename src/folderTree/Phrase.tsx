import { Box, Grid } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useDialogueItemConstructor, usePhrase } from "../Data/useDialogues";
import TextButton from "../components/buttons/TextButton";
import Answer from "./Answer";
import PhraseContructor from "../constructors/phraseContructor.tsx/PhraseContructor";

export interface IPhraseProps {
    dialogueId: string;
    parentId: string
    id: string;
}

export default function Phrase(props: IPhraseProps): JSX.Element | null {
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    function OnClick(event: any) {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <PhraseContructor 
            dialogueId={props.dialogueId} 
            id={phraseRecoil.id}
            parentId={props.parentId}
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
                            <Answer key={answer.id} dialogueId={props.dialogueId} id={answer.id} parentId={props.id}/>
                        ))}
                    </Grid>
                </TreeItem>
            </TextButton>

        </Box>
    )
}