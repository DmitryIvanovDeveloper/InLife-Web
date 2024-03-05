import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useSelectDialogueLine as useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { IoMdAddCircle } from "react-icons/io";
import { DialogueItemType } from "./DialogueitemType";
import ISelectDialogueLine from "../../Constructors/models/ISelectDialogueLine";
import { useDialogueItemState } from "../../Data/useDialogueitemState";
import { useNpcSelection } from "../../Data/useSelectedNpc";
import useConstructorActions from "../../Data/ConstructorActions";
import { useDialogueItemColorsMap } from "../../Data/useDialogueItemColors";
import Stratch from '../../Images/Stratch.png';
import MarkPurple from '../../Images/Marks/Mark Purple.png';

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

    const dialogueItemLabel = (name: string): string => {
        return !name ? name : `${name.substring(0, 35)}...`
    }

    const getMark = (id: string): string => {
        var item = dialogueItemColorsMap.find(item => item.id == id);
        
        return item?.color ?? ""
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
                style={{ overflow: "visible", }}
            >
                <Box >
                    <Box 
                        position='absolute'
                        sx={{
                            backgroundColor: "white",
                            padding: 1,
                            display: "flex",
                        }}>

                        <Box
                            onMouseEnter={() => setIsMouseOverNode(true)}
                            onMouseLeave={() => setIsMouseOverNode(false)}
                        >
                            <Box
                                sx={{
                                    mt: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {props.customNodeElementProps.nodeDatum.attributes?.nodeType != DialogueItemType.Dialogue &&
                                    props.customNodeElementProps.nodeDatum.attributes?.nodeType != DialogueItemType.Answer
                                    ? <Box
                                        width='100%'
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
                                <Typography sx={{ p: 1 }} variant="h6" align="center">{
                                    dialogueItemLabel(props.customNodeElementProps.nodeDatum.name)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* <Box display='flex' justifyContent="center">
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
                    </Box> */}

                    <Box
                        component='image'
                        sx={{
                            ml: 2,
                            width: "30%",
                            content: {
                                xs: `url(${getMark(props.customNodeElementProps.nodeDatum.attributes?.id as string)})`, //img src from xs up to md
                                md: `url(${getMark(props.customNodeElementProps.nodeDatum.attributes?.id as string)})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                        }}

                    />
                      <Box
                        component='image'
                        sx={{
                            width: "100%",
                            content: {
                                xs: `url(${Stratch})`, //img src from xs up to md
                                md: `url(${Stratch})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                        }}

                    />
                </Box>

            </foreignObject>
        </g>
    );
}

