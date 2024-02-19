import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useSelectDialogueLine as useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { RxAvatar } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import Constructor from "../../Constructors/PhraseContructor/Constructor";
import DialogueConstructor from "../../Constructors/DialogueConstructor/DialogueConstructor";
import { DialogueItemType } from "./DialogueitemType";
import ISelectDialogueLine from "../../Constructors/models/ISelectDialogueLine";
import { useDialogueItemState } from "../../Data/useDialogueitemState";

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
    const [dialogueItemState, setDialogueItemState] = useDialogueItemState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectDialogueLine, setSelectDialogueItem] = useSelectDialogueLine();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const onClick = (id: string, parentId: string, nodeType: DialogueItemType) => {
        if (nodeType == DialogueItemType.Dialogue) {
            setDialogueItemConstructor(() =>
                <DialogueConstructor id={id} />);
        }

        if (nodeType == DialogueItemType.Phrase) {
            setDialogueItemConstructor(() =>
                <Constructor
                    id={id}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                />);

                const updatedSelectDialogueLine: ISelectDialogueLine = {
                    dialogueItemId: id,
                    line: {
                        name: "",
                        id: "",
                    },
                    nextDialogueItemId: ""
                }
                
                setSelectDialogueItem(updatedSelectDialogueLine);
        }
        
        if (nodeType == DialogueItemType.Answer) {
            setDialogueItemConstructor(() =>
                <Constructor
                    id={parentId}
                    dialogueId={props.customNodeElementProps.nodeDatum.attributes?.dialogueId as string}
                    parentId={parentId}
                />);

                const updatedSelectDialogueLine: ISelectDialogueLine = {
                    dialogueItemId: parentId,
                    line: {
                        name: selectDialogueLine.line.name,
                        id
                    },
                    nextDialogueItemId: ""
                }

                setSelectDialogueItem(updatedSelectDialogueLine);
        }
    }

    const onCreateNewNode = async (id: string, nodeType: DialogueItemType) => {
        if (!id) {
            return;   
        }

        setIsLoading(true);
        if (nodeType == DialogueItemType.Phrase) {
            await answerQueriesApi.create(id);
        }

        if (nodeType == DialogueItemType.Answer) {
            await phraseQueriesApi.create(id);
        }
        setIsLoading(false);
    }

    const getNodeColor = (nodeId?: string): string => {
        if (nodeId == selectDialogueLine.dialogueItemId) {
            return "#ff5722";
        }
        if (nodeId == selectDialogueLine.line.id) {
            return "#673ab7";
        }
        if (nodeId == selectDialogueLine.nextDialogueItemId ) {
            return "red";
        }

        return "white";
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
                        backgroundColor: dialogueItemState == DialogueItemStateType.UnsavedChanges && props.customNodeElementProps.nodeDatum.attributes?.id == selectDialogueLine.dialogueItemId
                            ? "#ffe082"
                            : props.customNodeElementProps.nodeDatum.attributes?.color as string,
                        margin: 1,
                        padding: 1,
                        borderColor: getNodeColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
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
                        : selectDialogueLine.dialogueItemId == props.customNodeElementProps.nodeDatum.attributes?.id &&
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
