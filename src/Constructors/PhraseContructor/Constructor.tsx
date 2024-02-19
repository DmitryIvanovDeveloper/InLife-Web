import TabContext from '@mui/lab/TabContext';
import { Alert, Box, Button, Divider, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDialogue, usePhrase } from "../../Data/useDialogues";
import { useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import AppBarDeleteButton from "../../Components/AppBarDeleteButton";
import PhraseConstructor from './Phrase/PhraseContructor';
import Message from '../../Components/ChatElement/Message';
import { EditDialogueItemType } from '../models/EditType';
import DialogueLineContructor from '../DialogueLine/DialogueLineContructor';
import { IDialogueItemEditState } from '../models/IPhraseSettingsState';
import PhraseSettings from './Phrase/PhraseSettings';
import DialogueLineSettings from './DialogueLineSettings';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import React from 'react';
import Instruction from '../Instruction';
import { useDialogueItemState } from '../../Data/useDialogueitemState';
import useConstructorActions from '../../Data/ConstructorActions';
import DialogueLinesTabSettings from './Phrase/DialogueLinesTabSettings';
import DeleteDialogueItemButton from '../../Components/Button/DeleteDialogueItemButton';
import { Locations } from '../../Data/Locations';

const defaultDialogueItemState: IDialogueItemEditState = {
    isPhraseEdited: false,
    isPhraseCommentsEdited: false,
    isPhraseTensesesEdited: false,
    isAnswersEdited: false,
    isAnswersTensesListEdited: false,
    isAnswersTranslatesEdited: false,
    isAnswersPossibleWordsEdited: false,
}

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string
    onEditedDialogueItemType?: (PhraseSettingsState: IDialogueItemEditState) => {}
}


export default function Constructor(props: IPhraseConstructor): JSX.Element | null {
    const dialogueRecoil = useDialogue(props.dialogueId);
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const constructorActions = useConstructorActions();

    const [status, setStatus] = useState<Status>(Status.OK);

    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>(undefined);
    const [currentDialogueLineData, setCurrentDialogueLineData] = useState<string[]>([]);
    const [nextPhraseCaption, setNextPharseCaption] = useState<string>("");
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogueItemState, setDialogueItemState] = useDialogueItemState();



    //TODO: Refactor
    const [dialogueItemEditState, setDialogueItemEditState] = useState<IDialogueItemEditState>(() => {
        var data = localStorage.getItem(`${props.id} Constructor-Edit-State`);
        return !data ? defaultDialogueItemState : JSON.parse(data);
    });

    const isEditDialogueItem = (): boolean => {
        return editDialogueItemType == EditDialogueItemType.Phrase ||
            editDialogueItemType == EditDialogueItemType.PhraseTenseses ||
            editDialogueItemType == EditDialogueItemType.Comments
        ;
    }

    const onEditDialogueItemType = (newEditDialogueItemType: EditDialogueItemType) => {
        if (newEditDialogueItemType == editDialogueItemType) {
            setEditDialogueItemType(undefined);
            return;
        }

        setEditDialogueItemType(newEditDialogueItemType);
    }


    const onEditedDialogueItemType = (editedDialogueItemType: EditDialogueItemType, isEdited: boolean) => {

        if (editedDialogueItemType == EditDialogueItemType.Phrase) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isPhraseEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.PhraseTenseses) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isPhraseTensesesEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.Comments) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isPhraseCommentsEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.Answers) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isAnswersEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.AnswersTenseses) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isAnswersTensesListEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.Translates) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isAnswersTranslatesEdited: isEdited
            }))
        }
        if (editedDialogueItemType == EditDialogueItemType.PossibleWords) {
            setDialogueItemEditState(prev => ({
                ...prev,
                isAnswersPossibleWordsEdited: isEdited
            }))
        }
    }

    // UseEffects

    useEffect(() => {
        if (!phraseRecoil.answers.length) {
            setCurrentDialogueLineData([])
            return;
        }

        var answer = phraseRecoil.answers.find(answer => answer?.id == selectDialogueLine.line.id);
        if (!answer) {
            return;
        }

        setCurrentDialogueLineData(answer.texts);

    }, [selectDialogueLine.line.id]);

    useEffect(() => {
        var expectedAnswer = phraseRecoil.answers.find(answer => answer?.id == selectDialogueLine.line.id)
        if (!expectedAnswer || !expectedAnswer.phrases.length) {
            setNextPharseCaption("");
            return;
        }

        var nextPhrase = expectedAnswer.phrases[0];

        setNextPharseCaption(nextPhrase.text);

        setSelectDialogueLine(prev => ({
            ...prev,
            nextDialogueItemId: nextPhrase.id
        }))

    }, [selectDialogueLine.line.id])


    useEffect(() => {
        localStorage.setItem(`${props.id} Constructor-Edit-State`, JSON.stringify(dialogueItemEditState));
    }, [dialogueItemEditState]);

    useEffect(() => {
        var data = localStorage.getItem(`${props.id} Constructor-Edit-State`);
        if (!data) {
            return;
        }
        setDialogueItemEditState(JSON.parse(data));
    }, []);


    useEffect(() => {

        if (dialogueItemEditState.isPhraseEdited) {
            setEditDialogueItemType(EditDialogueItemType.Phrase)
            return;
        }
        if (dialogueItemEditState.isPhraseCommentsEdited) {
            setEditDialogueItemType(EditDialogueItemType.Comments);
            return;
        }
        if (dialogueItemEditState.isPhraseCommentsEdited) {
            setEditDialogueItemType(EditDialogueItemType.PhraseTenseses);
            return;
        }
        if (dialogueItemEditState.isAnswersEdited) {
            setEditDialogueItemType(EditDialogueItemType.Answers);
            return;
        }
        if (dialogueItemEditState.isAnswersPossibleWordsEdited) {
            setEditDialogueItemType(EditDialogueItemType.PossibleWords);
            return;
        }
        if (dialogueItemEditState.isAnswersTensesListEdited) {
            setEditDialogueItemType(EditDialogueItemType.AnswersTenseses);
            return;
        }
        if (dialogueItemEditState.isAnswersTranslatesEdited) {
            setEditDialogueItemType(EditDialogueItemType.Translates);
            return;
        }
    }, []);


    if (!phraseRecoil) {
        return null;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                overflowY: "scroll",
                
            }}
            autoComplete="off"
        >
            <Instruction
                editDialogueItemType={editDialogueItemType}
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
            />

            <Paper elevation={0}
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                {dialogueItemState != DialogueItemStateType.NoErrors
                    ? <Box display='flex' justifyContent='flex-end' flexDirection="row">
                        <Button onClick={() => constructorActions.setIsReset(true)}>Reset unsaved changes</Button>
                    </Box>
                    : null
                }

                <TabContext value={selectDialogueLine.line.id}>

                    <DeleteDialogueItemButton />
                    
                    <Box display='flex' flexDirection="row" justifyContent='space-between'>
                        <PhraseSettings
                            onEditDialogueItemType={onEditDialogueItemType}
                            editDialogueItemType={editDialogueItemType}
                            dialogueItemEditState={dialogueItemEditState}
                            phraseCaption={phraseRecoil.text}
                            phraseAudio={phraseRecoil.audioSettings.audioData ?? ""}
                            name={Locations.find(location => location.id == dialogueRecoil.levelId)?.name ?? ""}
                        />

                        {editDialogueItemType != undefined
                            ? <Box>
                                <IconButton onClick={() => setIsOpen(true)}>
                                    <HelpOutlinedIcon />
                                </IconButton>
                            </Box>
                            : null
                        }

                    </Box>
                    <Box display='flex' justifyContent='end'>
                        <DialogueLinesTabSettings
                            answers={phraseRecoil.answers}
                            setEditDialogueItemType={() => setEditDialogueItemType(undefined)}
                        />
                    </Box>

                    <DialogueLineSettings
                        onEditDialogueItemType={onEditDialogueItemType}
                        editDialogueItemType={editDialogueItemType}
                        dialogueItemEditState={dialogueItemEditState}
                        currentDialogueLineData={currentDialogueLineData}
                    />

                    {!!nextPhraseCaption
                        ? <Message
                            title={Locations.find(location => location.id == dialogueRecoil.levelId)?.name ?? ""}
                            position={"left"}
                            type={"text"}
                            text={nextPhraseCaption}
                        />
                        : null

                    }

                </TabContext>
            </Paper >
            <Box
                sx={{
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                {isEditDialogueItem()
                    ? <PhraseConstructor
                        dialogueId={props.dialogueId}
                        id={phraseRecoil.id}
                        parentId={phraseRecoil.parentId}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                    : <DialogueLineContructor
                        dialogueId={props.dialogueId}
                        id={selectDialogueLine.line.id}
                        parentId={phraseRecoil.id}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                }

            </Box>

            <Divider variant="fullWidth" />

            {/* {!isEdited || status != Status.OK
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={onReset}>reset all changes</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            } */}

            {status != Status.OK
                ? <Alert severity="error">Something went wrong! Please try leter!</Alert>
                : null
            }
            {!phraseRecoil.audioSettings?.audioData && !!phraseRecoil.text
                ? <Alert severity="error">The phrase is not generated to audio!</Alert>
                : null
            }
        </Box>
    )
}

const commonStyle = {
    editedItemColor: "#ff9800",
    editItemColor: "#fafafa"
}