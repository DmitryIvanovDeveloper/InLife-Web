import { useState } from "react";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import AnswerContructor from "../../constructors/answerContructor/AnswerConstructor";
import DialogueConstructor from "../../constructors/dialogueConstructor/DialogueConstructor";
import PhraseContructor from "../../constructors/phraseContructor/PhraseContructor";
import { NodeType } from "./DialogueitemType";
import { CustomNodeElementProps } from "react-d3-tree";
import { useSelection } from "../../Data/useSelection";
import AddBoxIcon from '@mui/icons-material/AddBox';
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import { IconButton } from "@mui/material";

const nodeSize = { x: 200, y: 200 };
const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20,
    margin: 1
};

export interface IRenderForeignDialogueItemNodeProps {
    customNodeElementProps: CustomNodeElementProps,
}

export function DialogueItemNode(props: IRenderForeignDialogueItemNodeProps) {
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [states, setStates] = useState<DialogueItemStateType[]>([DialogueItemStateType.NoErrors]);
    const [selection, setSelection] = useSelection();

    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const onClick = (id: string, nodeType: NodeType) => {
        setSelection(id);

        console.log(id);
        if (nodeType == NodeType.Dialogue) {
            setDialogueItemConstructor(() =>
                <DialogueConstructor
                    id={id}
                    setStates={setStates}
                />);
        }

        if (nodeType == NodeType.Phrase) {
            setDialogueItemConstructor(() =>
                <PhraseContructor
                    id={id}
                    setStates={setStates}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                />);

        }

        if (nodeType == NodeType.Answer) {
            setDialogueItemConstructor(() =>
                <AnswerContructor
                    id={id}
                    setStates={setStates}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={props.customNodeElementProps.nodeDatum.attributes?.parentId as string}
                />);
        }
    }

    const onCreateNewNode = (id: string, nodeType: NodeType) => {
        if (nodeType == NodeType.Phrase) {
            answerQueriesApi.create(id);
        }

        if (nodeType == NodeType.Answer) {
            phraseQueriesApi.create(id);
        }
    }

    return (
        <g>
            <circle r={15}></circle>
            <foreignObject
                onClick={() => onClick(props.customNodeElementProps.nodeDatum.attributes?.id as string, props.customNodeElementProps.nodeDatum.attributes?.nodeType as NodeType)}
                {...foreignObjectProps}>
                <div
                    style={{
                        border: "1px solid transparent",
                        borderRadius: "5px",
                        backgroundColor: states[0] == DialogueItemStateType.UnsavedChanges
                            ? "#ffe082"
                            : props.customNodeElementProps.nodeDatum.attributes?.color as string,
                        margin: 1,
                        padding: 1,
                        borderColor: selection == props.customNodeElementProps.nodeDatum.attributes?.id
                            ? "#ff5722"
                            : props.customNodeElementProps.nodeDatum.attributes?.color as string,
                        borderBlockWidth: 10
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>{props.customNodeElementProps.nodeDatum.name}</h3>
                </div>
                {selection == props.customNodeElementProps.nodeDatum.attributes?.id
                    ? <IconButton>
                        <AddBoxIcon onClick={() => onCreateNewNode(props.customNodeElementProps.nodeDatum.attributes?.id as string, props.customNodeElementProps.nodeDatum.attributes?.nodeType as NodeType)} />
                    </IconButton>
                    : null
                }

            </foreignObject>
        </g>
    );
}
