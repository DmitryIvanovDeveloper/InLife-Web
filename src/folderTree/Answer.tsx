import React from "react"
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Phrase from "./Phrase";
import TextButton from "../components/buttons/TextButton";
import { useAnswer, useDialogueItemConstructor } from "../Data/useDialogues";
import AnswerContructor from "../constructors/answerContructor/AnswerConstructor";

export interface IAnswerProps {
    dialogueId: string,
    id: string,
}

export default function Answer(props: IAnswerProps): JSX.Element | null {

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const onClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={answerRecoil.id} />);
    }

    if (!answerRecoil){
        return null;
    }

    return (
        <TextButton onClick={onClick}>
            <TreeItem 
                style={{color: "darkgreen"}} 
                key={answerRecoil.id} 
                nodeId={answerRecoil.id} 
                label={`${answerRecoil.texts.join()} [A]`}>
                {answerRecoil.phrases.map(phrase => {
                    return (
                        <Phrase key={phrase.id} dialogueId={props.dialogueId} id={phrase.id} />
                    );
                })}
            </TreeItem>
        </TextButton>
    )
}

