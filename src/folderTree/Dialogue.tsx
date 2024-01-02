import { Box } from "@mui/material";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import TextButton from "../components/buttons/TextButton";
import { useDialogue, useDialogueItemConstructor } from "../Data/useDialogues";
import DialogueConstructor from "../constructors/dialogueConstructor/DialogueConstructor";
import Phrase from "./Phrase";
import { useTreeState } from "../Data/useTreeState";

export interface IDialogueProps {
    id: string,
}
export default function Dialogue(props: IDialogueProps) {

    var dialogueRecoil = useDialogue(props.id);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const onClick = (id: string) => {
        setDialogueItemConstructor(() => <DialogueConstructor id={id} />);
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
                    label={`${dialogueRecoil.name} [D]`}
                >
                    {
                        dialogueRecoil.isVoiceSelected
                            ?  <Phrase
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