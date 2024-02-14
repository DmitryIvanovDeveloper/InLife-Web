import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import AnswerContructor from '../../Constructors/AnswerContructor/AnswerConstructor';
import PhraseConstructor from '../../Constructors/PhraseContructor/PhraseConstructor';
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useNextDialogueItemSelection, useSelectedDialogueItemSelection } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { NodeType } from "./DialogueitemType";
import { RxAvatar } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import Constructor from "../../Constructors/UpdatedConstructor/Constructor";

const nodeSize = { x: 200, y: 500 };
const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20,
    position: 'relative'

};

export interface IRenderForeignDialogueItemNodeProps {
    customNodeElementProps: CustomNodeElementProps,
}

export function DialogueItemNode(props: IRenderForeignDialogueItemNodeProps) {
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [nextDialoguItemSelection, setNextdialoguItemSelection] = useNextDialogueItemSelection();

    const [states, setStates] = useState<DialogueItemStateType[]>([DialogueItemStateType.NoErrors]);
    const [selection, setSelection] = useSelectedDialogueItemSelection();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const onClick = (id: string, nodeType: NodeType) => {
        setSelection(id);

        if (nodeType == NodeType.Dialogue) {
            setDialogueItemConstructor(() =>
                <Constructor
                    dialogueId={id}
                // setStates={setStates}
                />);
        }

        if (nodeType == NodeType.Phrase) {
            setDialogueItemConstructor(() =>
                <PhraseConstructor
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
            <foreignObject
                onClick={() => onClick(props.customNodeElementProps.nodeDatum.attributes?.id as string, props.customNodeElementProps.nodeDatum.attributes?.nodeType as NodeType)}
                {...foreignObjectProps}
                style={{ overflow: "visible" }}
            >
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
                            : nextDialoguItemSelection == props.customNodeElementProps.nodeDatum.attributes?.id
                                ? "#673ab7"
                                : props.customNodeElementProps.nodeDatum.attributes?.color as string,
                        borderBlockWidth: 10,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                >
                    {props.customNodeElementProps.nodeDatum.attributes?.nodeType == NodeType.Phrase
                        ? <Box
                            display='flex'
                            justifyContent='center'
                        >
                            <RxAvatar size={40} />
                        </Box>
                        : null
                    }
                    <h3 style={{ textAlign: "center" }}>{`${props.customNodeElementProps.nodeDatum.name}`}</h3>
                </div>
                <Box display='flex' justifyContent="center">
                    {isLoading
                        ? <CircularProgress size={30} />
                        : selection == props.customNodeElementProps.nodeDatum.attributes?.id &&
                            props.customNodeElementProps.nodeDatum.attributes?.nodeType != NodeType.Dialogue
                            ? <Button>
                                <IoMdAddCircle style={{ position: 'fixed', marginTop: 25 }} size={30} onClick={() =>
                                    onCreateNewNode(props.customNodeElementProps.nodeDatum.attributes?.id as string,
                                        props.customNodeElementProps.nodeDatum.attributes?.nodeType as NodeType)}
                                />
                            </Button>
                            : null
                    }
                </Box>
            </foreignObject>
        </g>
    );
}
