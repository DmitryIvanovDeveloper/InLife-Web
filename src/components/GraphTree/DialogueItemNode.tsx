import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useSelection } from "../../Data/useSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { NodeType } from "./DialogueitemType";
import AnswerContructor from '../../Constructors/AnswerContructor/AnswerConstructor';
import DialogueConstructor from '../../Constructors/DialogueConstructor/DialogueConstructor';
import PhraseContructor from '../../Constructors/PhraseContructor/PhraseContructor';
import a from '../../Images/Instructions/Phrase.png'
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const onClick = (id: string, nodeType: NodeType) => {
        setSelection(id);

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

    const onCreateNewNode = async (id: string, nodeType: NodeType) => {
        setIsLoading(true);
        if (nodeType == NodeType.Phrase) {
            await answerQueriesApi.create(id);
        }

        if (nodeType == NodeType.Answer) {
            await phraseQueriesApi.create(id);
        }
        setIsLoading(false);
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
                <Box display='flex' justifyContent="center">
                    {isLoading
                        ? <CircularProgress size={30} sx={{}}/>
                        : selection == props.customNodeElementProps.nodeDatum.attributes?.id
                            ? <Box display='flex' justifyContent="center">
                                <AddBoxIcon onClick={() => onCreateNewNode(props.customNodeElementProps.nodeDatum.attributes?.id as string, props.customNodeElementProps.nodeDatum.attributes?.nodeType as NodeType)} />
                            </Box>
                            : null
                    }
                </Box>


            </foreignObject>
        </g>
    );
}
