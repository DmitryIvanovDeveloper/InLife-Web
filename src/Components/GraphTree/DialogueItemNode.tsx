import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useDialogueLineSelection, useNextDialogueItemSelection, useSelectedDialogueItemSelection } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { RxAvatar } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import Constructor from "../../Constructors/PhraseContructor/Constructor";
import DialogueConstructor from "../../Constructors/DialogueConstructor/DialogueConstructor";
import { DialogueItemType } from "./DialogueitemType";

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
    const [dialogueLineSelection, setDialogueItemSelection] = useDialogueLineSelection();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const onClick = (id: string, parentId: string, nodeType: DialogueItemType) => {
        if (nodeType == DialogueItemType.Dialogue) {
            setDialogueItemConstructor(() =>
                <DialogueConstructor
                    id={id}
                    setStates={setStates}
                />);
        }

        if (nodeType == DialogueItemType.Phrase) {
            setDialogueItemConstructor(() =>
                <Constructor
                    id={id}
                    setStates={setStates}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                />);
        }

        if (nodeType == DialogueItemType.Answer) {
            setDialogueItemConstructor(() =>
                <Constructor
                    id={parentId}
                    setStates={setStates}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={parentId}
                />);
            setDialogueItemSelection(id);
        }

        setSelection(id);

    }

    const onCreateNewNode = async (id: string, nodeType: DialogueItemType) => {
        setIsLoading(true);
        if (nodeType == DialogueItemType.Phrase) {
            await answerQueriesApi.create(id);
        }

        if (nodeType == DialogueItemType.Answer) {
            await phraseQueriesApi.create(id);
        }
        setIsLoading(false);
    }

    //TODO: Refactor
    return (
        <g>
            <foreignObject
                onClick={() =>
                    onClick(
                        props.customNodeElementProps.nodeDatum.attributes?.id as string,
                        props.customNodeElementProps.nodeDatum.attributes?.parentId as string,
                        props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType

                    )}
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
                                : dialogueLineSelection == props.customNodeElementProps.nodeDatum.attributes?.id
                                    ? "red"
                                    : props.customNodeElementProps.nodeDatum.attributes?.color as string,
                        borderBlockWidth: 10,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                >
                    {props.customNodeElementProps.nodeDatum.attributes?.nodeType == DialogueItemType.Phrase
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
                            props.customNodeElementProps.nodeDatum.attributes?.nodeType != DialogueItemType.Dialogue
                            ? <Button>
                                <IoMdAddCircle style={{ position: 'fixed', marginTop: 25 }} size={30} onClick={() =>
                                    onCreateNewNode(props.customNodeElementProps.nodeDatum.attributes?.id as string,
                                        props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType)}
                                />
                            </Button>
                            : null
                    }
                </Box>
            </foreignObject>
        </g>
    );
}
