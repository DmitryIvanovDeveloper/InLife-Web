import { Avatar, Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree";
import { useSelectDialogueLine as useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { DialogueItemType } from "./DialogueitemType";
import ISelectDialogueLine from "../../Constructors/models/ISelectDialogueLine";
import { useNpcSelection } from "../../Data/useSelectedNpc";
import useConstructorActions from "../../Data/ConstructorActions";
import { useDialogueItemColorsMap } from "../../Data/useDialogueItemColors";
import Stratch from '../../Images/Stratch.png';
import Star from '../../Images/Marks/klipartz.com.png';
import Select from '../../Images/Marks/pngwing.com.png';
import Pencil from '../../Images/Pencil.png';
import PencilUnselected from '../../Images/PencilUnselected.png';
import Sharpener from '../../Images/Sharpener.png';
import SharpenerUnselect from '../../Images/SharpenerUselect.png';
import { useSelectedNodeToEditState } from "../../Data/useSelectedNodeToEdit";
import ModalConstructor from "../../Constructors/ModalContructor";

const nodeSize = { x: 200, y: 200 };
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectDialogueLine, setSelectDialogueItem] = useSelectDialogueLine();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();
    const [npc] = useNpcSelection();
    const [isMouseOverCreateNode, setIsMouseOverCreateNode] = useState<boolean>(false);
    const constructorActions = useConstructorActions();
    const [dialogueItemColorsMap] = useDialogueItemColorsMap();
    const [selectItemIdToEdit, setSelectItenToEdit] = useSelectedNodeToEditState();
    const [isMouseOverDeleteButton, setIsMouseOverDeleteButton] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClick = (id: string, parentId: string, nodeType: DialogueItemType) => {
        setSelectItenToEdit(id);

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

    const onCreateNewNode = async () => {
        setIsLoading(true);
        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType == DialogueItemType.Phrase) {
            await answerQueriesApi.create(props.customNodeElementProps.nodeDatum.attributes?.id as string);
        }

        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType == DialogueItemType.Answer) {
            await phraseQueriesApi.create(props.customNodeElementProps.nodeDatum.attributes?.id as string);
        }
        setIsLoading(false);
    }

    const removeConfirm = () => {
        
    }

    const onRemoveNode = async () => {
        setIsOpen(false);
        setIsLoading(true);
        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType == DialogueItemType.Phrase) {
            await phraseQueriesApi.delete(props.customNodeElementProps.nodeDatum.attributes?.id as string);
        }

        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType == DialogueItemType.Answer) {
            await answerQueriesApi.delete(props.customNodeElementProps.nodeDatum.attributes?.id as string);
        }
        setIsLoading(false);
    }

    const nodeAvatar = (): string | undefined => {
        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType == DialogueItemType.Phrase) {
            return npc?.avatar
        }

        return "";
    }

    const dialogueItemLabel = (name: string): string => {
        return !name ? name : `${name.substring(0, 35)}...`
    }

    const getMark = (): string => {
        var item = dialogueItemColorsMap.find(item => item.id == props.customNodeElementProps.nodeDatum.attributes?.id);

        return item?.color ?? ""
    }
    const isEdit = (): boolean => {
        if (props.customNodeElementProps.nodeDatum.attributes?.nodeType == DialogueItemType.Dialogue) {
            return false;
        }

        return selectItemIdToEdit == props.customNodeElementProps.nodeDatum.attributes?.id as string;
    }

    function PencilButton(): ReactElement {
        return (
            <Box
                onMouseEnter={() => setIsMouseOverCreateNode(true)}
                onMouseLeave={() => setIsMouseOverCreateNode(false)}
                component='button'
                onClick={() => onCreateNewNode()
                 }
            >
                <Tooltip title="Create">
                    <Box
                        component='image'
                        sx={{
                            width: "30%",
                            content: {
                                xs: `url(${isMouseOverCreateNode ? Pencil : PencilUnselected})`, //img src from xs up to md
                                md: `url(${isMouseOverCreateNode ? Pencil : PencilUnselected})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                            bottom: -20,
                            cursor: "pointer",
                        }}
                    >
                    </Box>
                </Tooltip>
            </Box >
        )
    }

    function SharpenerButton(): ReactElement {
        return (
            <Tooltip title="Delete">
                <Box
                    onMouseEnter={() => setIsMouseOverDeleteButton(true)}
                    onMouseLeave={() => setIsMouseOverDeleteButton(false)}
                    component='button'
                    onClick={() => setIsOpen(true)}
                >
                    <Box
                        component='image'
                        sx={{
                            width: "30%",
                            content: {
                                xs: `url(${isMouseOverDeleteButton ? Sharpener: SharpenerUnselect})`, //img src from xs up to md
                                md: `url(${isMouseOverDeleteButton ? Sharpener: SharpenerUnselect})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                            top: -30,
                            cursor: "pointer",
                        }}
                    >
                    </Box>
                </Box>
            </Tooltip>
        )
    }

    const getOnDeleteLabel = () => {
        return  props.customNodeElementProps.nodeDatum.attributes?.nodeType as DialogueItemType == DialogueItemType.Phrase 
            ?  "It looks like the phrase with 'storylines' you don't need any more! Need i to forget it?"
            : "It looks like the phrase with the 'storyline' you don't need any more! Need i to forget it?"
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
                 <ModalConstructor element={
                <Button
                    onClick={() => onRemoveNode()}
                    fullWidth>Forget
                </Button>
            }
                isOpen={isOpen}
                editDialogueItemType={undefined}
                onClose={() => setIsOpen(false)}
                description={getOnDeleteLabel()}
                specificButtonName="Close"
            />
                <Box
                >
                    <Box
                        position='absolute'
                        sx={{
                            backgroundColor: "white",
                            padding: 1,
                            display: "flex",
                        }}>

                        <Box

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
                                        <Avatar src={nodeAvatar()} sx={{ mt: 1 }} />
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


                    <Box
                        component='image'
                        sx={{
                            ml: 2,
                            width: "100%",
                            content: {
                                xs: `url(${props.customNodeElementProps.nodeDatum.attributes?.id == selectDialogueLine.line.id ? Select : ""})`, //img src from xs up to md
                                md: `url(${props.customNodeElementProps.nodeDatum.attributes?.id == selectDialogueLine.line.id ? Select : ""})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                            right: 0,
                            top: 0
                        }}

                    />
                    <Box
                        component='image'
                        sx={{
                            ml: 2,
                            width: "30%",
                            content: {
                                xs: `url(${props.customNodeElementProps.nodeDatum.attributes?.id == selectDialogueLine.dialogueItemId ? Star : ""})`, //img src from xs up to md
                                md: `url(${props.customNodeElementProps.nodeDatum.attributes?.id == selectDialogueLine.dialogueItemId ? Star : ""})`,  //img src from md and up
                            },
                            backgroundRepeat: "no-repeat",
                            position: 'absolute',
                            right: 0,
                            top: 0
                        }}

                    />
                    <Box
                        component='image'
                        sx={{
                            ml: 2,
                            width: "30%",
                            content: {
                                xs: `url(${getMark()})`, //img src from xs up to md
                                md: `url(${getMark()})`,  //img src from md and up
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

                <Box display='flex' justifyContent="center">
                    {isLoading
                        ? <CircularProgress size={30} />
                        : isEdit()
                            ? <Box>
                                <SharpenerButton />
                                <PencilButton />
                            </Box>
                            : null
                    }
                </Box>
            </foreignObject>
        </g >
    );
}