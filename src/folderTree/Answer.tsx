import React from "react"
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Phrase from "./Phrase.tsx";
import TextButton from "../components/buttons/TextButton.tsx";
import { useAnswer, useDialogueItemConstructor } from "../Data/useDialogues.ts";
import AnswerContructor from "../constructors/answerContructor/AnswerConstructor.tsx";

export interface IAnswerProps {
    dialogueId: string,
    id: string,
}

export default function Answer(props: IAnswerProps) {

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const onClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={answerRecoil.id} />);
    }

    if (!answerRecoil){
        return;
    }

    return (
        <TextButton onClick={onClick}>
            <TreeItem style={{color: "darkgreen"}} key={answerRecoil.id} nodeId={answerRecoil.id} label={`${answerRecoil.text}`}>
                {answerRecoil.phrases.map(phrase => {
                    return (
                        <Phrase key={phrase.id} dialogueId={props.dialogueId} id={phrase.id} />
                    );
                })}
            </TreeItem>
        </TextButton>
    )
}

