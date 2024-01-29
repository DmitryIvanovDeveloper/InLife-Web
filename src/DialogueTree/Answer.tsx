import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useState } from "react";
import AnswerContructor from "../Constructors/AnswerContructor/AnswerConstructor";
import { useAnswer, useDialogueItemConstructor } from "../Data/useDialogues";
import { DialogueItemStateType } from "../ThereGame.Business/Util/DialogueItemStateType";
import TextButton from "../Components/Button/TextButton";
import Phrase from "./Phrase";

export interface IAnswerProps {
    dialogueId: string,
    parentId: string
    id: string,
}

export default function Answer(props: IAnswerProps): JSX.Element | null {

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const answerRecoil = useAnswer(props.dialogueId, props.id);
    const [states, setStates] = useState<DialogueItemStateType[]>([DialogueItemStateType.NoErrors]);

    const onClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <AnswerContructor 
            dialogueId={props.dialogueId} 
            id={props.id} 
            parentId={props.parentId} 
            setStates={setStates}
        />);
    }

   

    if (!answerRecoil){
        return null;
    }

    return (
        <TextButton onClick={onClick}>
            <TreeItem 
                style={{color: states[0] == DialogueItemStateType.UnsavedChanges ? "#e65100":  "darkgreen"}} 
                key={answerRecoil.id} 
                nodeId={answerRecoil.id} 
                label={`${!answerRecoil.texts.length ? "New Answer" : answerRecoil.texts[0]} [A]`}>
                {answerRecoil.phrases.map(phrase => (
                        <Phrase 
                            key={phrase.id} 
                            dialogueId={props.dialogueId} 
                            id={phrase.id} 
                            parentId={props.parentId}
                        />
                    ))}
            </TreeItem>
        </TextButton>
    )
}

