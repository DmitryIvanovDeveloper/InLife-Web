import { Avatar, Box, Button, CircularProgress } from "@mui/material";
import { Component, useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useSelectDialogueLine as useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { IoMdAddCircle } from "react-icons/io";
import Constructor from "../../Constructors/Constructor";
import { DialogueItemType } from "./DialogueitemType";
import ISelectDialogueLine from "../../Constructors/models/ISelectDialogueLine";
import { useDialogueItemState } from "../../Data/useDialogueitemState";
import { useNpcSelection } from "../../Data/useSelectedNpc";
import useConstructorActions from "../../Data/ConstructorActions";
import { useDialogueItemColorsMap } from "../../Data/useDialogueItemColors";

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
    const [dialogueItemState] = useDialogueItemState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectDialogueLine, setSelectDialogueItem] = useSelectDialogueLine();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();
    const [npc] = useNpcSelection();
    const [isMouseOverNode, setIsMouseOverNode] = useState<boolean>(false);
    const constructorActions = useConstructorActions();
    const [dialogueItemColorsMap, setDualogueItemsColorMap] = useDialogueItemColorsMap();

    const onClick = (id: string, parentId: string, nodeType: DialogueItemType) => {

        if (nodeType == DialogueItemType.Phrase) {
            const updatedSelectDialogueLine: ISelectDialogueLine = {
                dialogueItemId: id,
                line: {
                    name: "",
                    id: "",
                },
                nextDialogueItemId: ""
            }

            setSelectDialogueItem(updatedSelectDialogueLine);
            constructorActions.setSpecificPhrase(id);
        }

        if (nodeType == DialogueItemType.Answer) {
         
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
            return "black";
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

    const getColor = (nodeId: string): string => {
        var item = dialogueItemColorsMap.find(item => item.id == nodeId);
        return item?.color ?? "white"
    }

    const dialogueItemLabel = (name: string): string => {
        return !name ? name : `${name.substring(0, 35)}...`
    }

    const defaultStyle = {
        borderRadius: "5px",
        backgroundColor: getColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        margin: 3,
        padding: 10,
        borderColor: getNodeColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        boxShadow: "none"
    }

    const selectedNodeStyle = {
        border: "1px solid transparent",
        borderRadius: "10px",
        borderColor: getNodeColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
        boxShadow: "rgba(0, 8, 162, 0.8) 0px 1px 1px",
        backgroundColor: getColor(props.customNodeElementProps.nodeDatum.attributes?.id as string),
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
                <Box
                    sx={selectDialogueLine.dialogueItemId == props.customNodeElementProps.nodeDatum.attributes?.id
                        ? {
                            width: '100%',
                            backgroundColor: 'red',
                            borderRadius: "10px",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }
                        : null
                    }
                >
                    <Box
                        sx={{ width: "90%", }}
                        onMouseEnter={() => setIsMouseOverNode(true)}
                        onMouseLeave={() => setIsMouseOverNode(false)}
                        style={selectDialogueLine.line.id == props.customNodeElementProps.nodeDatum.attributes?.id
                            ? selectedNodeStyle
                            : {
                                boxShadow: "rgba(0, 8, 162, 0.8) 0px 1px 1px",
                                backgroundColor: 'white',
                                borderRadius: "10px",
                            }
                        }
                    >
                        <Box style={defaultStyle}></Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {props.customNodeElementProps.nodeDatum.attributes?.nodeType != DialogueItemType.Dialogue
                                ? <Box
                                    width='90%'
                                    display='flex'
                                    justifyContent='center'
                                    boxShadow='none'
                                >
                                    <Avatar src={nodeAvatar(props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType)} sx={{ mt: 1 }} />
                                </Box>
                                : null
                            }
                        </Box>

                        <Box>
                            <h3 style={{ textAlign: "center" }}>{
                                dialogueItemLabel(props.customNodeElementProps.nodeDatum.name)}
                            </h3>
                        </Box>
                    </Box>
                </Box>

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

