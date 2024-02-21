import { Avatar, Box, Button, CircularProgress } from "@mui/material";
import { Component, useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useSelectDialogueLine as useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { IoMdAddCircle } from "react-icons/io";
import Constructor from "../../Constructors/PhraseContructor/Constructor";
import { DialogueItemType } from "./DialogueitemType";
import ISelectDialogueLine from "../../Constructors/models/ISelectDialogueLine";
import { useDialogueItemState } from "../../Data/useDialogueitemState";
import { useNpcSelection } from "../../Data/useSelectedNpc";
import FullScenario from "../../Constructors/PhraseContructor/FullScenario";

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
    const [npc] = useNpcSelection();
    const [isMouseOverNode, setIsMouseOverNode] = useState<boolean>(false);

    const onClick = (id: string, parentId: string, nodeType: DialogueItemType) => {
        if (id == selectDialogueLine.dialogueItemId) {

            setDialogueItemConstructor(() => <div />);

        }

        if (nodeType == DialogueItemType.Dialogue) {
            setDialogueItemConstructor(() => null)
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

        if (nodeId == selectDialogueLine.nextDialogueItemId) {
            return "#4caf50";
        }

        return "white";
    }

    const nodeAvatar = (nodeType: DialogueItemType): string | undefined => {
        if (nodeType == DialogueItemType.Phrase) {
            return npc?.avatar
        }

        return "";
    }

    const backgroundColor = (nodeId: string): string => {
        if (dialogueItemState == DialogueItemStateType.UnsavedChanges && nodeId == selectDialogueLine.dialogueItemId) {
            return "#ffe082";
        }

        return "white"
    }

    const dialogueItemLabel = (name: string): string => {
        return !name ? name : `${name.substring(0, 35)}...`
    }

    const shadow = (nodeId: string): string => {
        if (nodeId == selectDialogueLine.dialogueItemId ||
            nodeId == selectDialogueLine.line.id ||
            nodeId == selectDialogueLine.nextDialogueItemId
        ) {
            return "rgba(0, 8, 162, 0.8) 0px 1px 1px";
        }

        return "none";
    }

    const defaultStyle = {
        border: "1px solid transparent",
        borderRadius: "5px",
        backgroundColor: backgroundColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        margin: 1,
        borderColor: getNodeColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        boxShadow: "rgba(0, 8, 162, 0.8) 0px 1px 1px"
    }

    const selectedNodeStyle = {
        border: "1px solid transparent",
        borderRadius: "5px",
        backgroundColor: "white", // backgroundColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        margin: 3,
        borderColor: getNodeColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        boxShadow: shadow(props.customNodeElementProps.nodeDatum.attributes?.id as string),
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
                    onMouseEnter={() => setIsMouseOverNode(true)}
                    onMouseLeave={() => setIsMouseOverNode(false)}
                    style={isMouseOverNode ? defaultStyle : selectedNodeStyle}
                >
                    {props.customNodeElementProps.nodeDatum.attributes?.nodeType != DialogueItemType.Dialogue
                        ? <Box
                            display='flex'
                            justifyContent='center'
                        >
                            <Avatar src={nodeAvatar(props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType)} />
                        </Box>

                        : null
                    }
                    <Box>
                        <h3 style={{ textAlign: "center" }}>{
                            dialogueItemLabel(props.customNodeElementProps.nodeDatum.name)}
                        </h3>
                    </Box>
                </div>
                <Box display='flex' justifyContent="center">
                    {isLoading
                        ? <CircularProgress size={30} />
                        : (selectDialogueLine.line.id == props.customNodeElementProps.nodeDatum.attributes?.id ||
                            selectDialogueLine.dialogueItemId == props.customNodeElementProps.nodeDatum.attributes?.id ||
                            selectDialogueLine.nextDialogueItemId == props.customNodeElementProps.nodeDatum.attributes?.id) &&
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

