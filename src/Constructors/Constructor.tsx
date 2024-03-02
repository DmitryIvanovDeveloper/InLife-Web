import TabContext from '@mui/lab/TabContext';
import { Alert, Box, Button, CircularProgress, Divider, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDialogue, usePhrase } from "../Data/useDialogues";
import { useSelectDialogueLine } from "../Data/useDialogueItemSelection";
import { DialogueItemStateType } from "../ThereGame.Business/Util/DialogueItemStateType";
import { Status } from "../ThereGame.Infrastructure/Statuses/Status";
import PhraseConstructor from './PhraseContructor/Phrase/PhraseContructor';
import Message from '../Components/ChatElement/Message';
import { EditDialogueItemType } from './models/EditType';
import DialogueLineContructor from './DialogueLine/DialogueLineContructor';
import { IDialogueItemEditState } from './models/IPhraseSettingsState';
import PhraseSettings from './PhraseContructor/Phrase/PhraseSettings';
import DialogueLineSettings from './PhraseContructor/DialogueLineSettings';
import React from 'react';
import Instruction from './Instruction';
import { useDialogueItemState } from '../Data/useDialogueitemState';
import useConstructorActions from '../Data/ConstructorActions';
import DialogueLinesTabSettings from './PhraseContructor/Phrase/DialogueLinesTabSettings';
import DeleteDialogueItemButton from '../Components/Button/DeleteDialogueItemButton';
import { Locations } from '../Data/Locations';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import usePhraseQueriesApi from '../ThereGame.Api/Queries/PhraseQueriesApi';
import { keyframes } from '@mui/system';
import { useDialogueItemColorsMap } from '../Data/useDialogueItemColors';
import { useConstructorActionsState } from '../Data/useConstructorActionsState';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

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
    // onEditedDialogueItemType?: (PhraseSettingsState: IDialogueItemEditState) => {}
}
const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function Constructor(props: IPhraseConstructor): JSX.Element | null {
    const [actionState] = useConstructorActionsState();

    const dialogueRecoil = useDialogue(actionState.selectedNpc.scenarioId);
    const phraseRecoil = usePhrase(actionState.selectedNpc.scenarioId, actionState.selectedNpc.specificPhraseId);
    const constructorActions = useConstructorActions();

    const [status, setStatus] = useState<Status>(Status.OK);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>(undefined);
    const [currentDialogueLineData, setCurrentDialogueLineData] = useState<string[]>([]);
    const [nextPhraseCaption, setNextPharseCaption] = useState<string>("");
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogueItemState] = useDialogueItemState();
    const [isPhraseCreating, setIsPhraseCreating] = useState<boolean>(false);
    const [dialogueItemColorsMap] = useDialogueItemColorsMap();

    const phraseQueriesApi = usePhraseQueriesApi();


    //TODO: Refactor
    const [dialogueItemEditState, setDialogueItemEditState] = useState<IDialogueItemEditState>(() => {
        var data = localStorage.getItem(`${actionState.selectedNpc.specificPhraseId} Constructor-Edit-State`);
        return !data ? defaultDialogueItemState : JSON.parse(data);
    });

    const onEditDialogueItemType = (newEditDialogueItemType: EditDialogueItemType | undefined) => {
        if (newEditDialogueItemType == editDialogueItemType || newEditDialogueItemType == undefined) {
            setEditDialogueItemType(undefined);
            return;
        }

        setEditDialogueItemType(newEditDialogueItemType);
    }
    const onCreatePhrase = async () => {
        if (!selectDialogueLine.line.id) {
            return;
        }
        setIsPhraseCreating(true);
        await phraseQueriesApi.create(selectDialogueLine.line.id);
        setIsPhraseCreating(false);
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

    function CreateNextPhraseComponent() {
        if (isPhraseCreating) {
            return <CircularProgress size={20} />
        }
        if (!selectDialogueLine.line.id) {
            return null;
        }
        return (
            <IconButton onClick={onCreatePhrase}>
                <MapsUgcIcon />
            </IconButton>
        )
    }
    // UseEffects

    useEffect(() => {
        if (!phraseRecoil?.answers?.length) {
            setCurrentDialogueLineData([])
            return;
        }

        var answer = phraseRecoil?.answers.find(answer => answer?.id == selectDialogueLine.line.id);
        if (!answer) {
            return;
        }

        setCurrentDialogueLineData(answer.texts);

    }, [selectDialogueLine.line.id]);

    useEffect(() => {
        var expectedAnswer = phraseRecoil?.answers.find(answer => answer?.id == selectDialogueLine.line.id)
        if (!expectedAnswer || !expectedAnswer?.phrases?.length) {
            setNextPharseCaption("");
            return;
        }

        var nextPhrase = expectedAnswer.phrases[0];

        setNextPharseCaption(nextPhrase?.text);

        setSelectDialogueLine(prev => ({
            ...prev,
            nextDialogueItemId: nextPhrase.id
        }))

    }, [selectDialogueLine.line.id])


    useEffect(() => {
        localStorage.setItem(`${actionState.selectedNpc.specificPhraseId} Constructor-Edit-State`, JSON.stringify(dialogueItemEditState));
    }, [dialogueItemEditState]);

    useEffect(() => {
        var data = localStorage.getItem(`${actionState.selectedNpc.specificPhraseId} Constructor-Edit-State`);
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

    useEffect(() => {
        var data = localStorage.getItem(`Position`);
        if (!data) {
            return;
        }
        var lastPosition = JSON.parse(data)
        // setPosition(lastPosition);
    }, []);

    const eventLogger = (event: any) => {
        setPosition({ x: event.x, y: event.y })

        localStorage.setItem(`Position`, JSON.stringify(position));
        console.log(event.y);
    };

    // if (!phraseRecoil) {
    //     return null;
    // }

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: '40%'
            }}
        >
            {/* <Resizable
                defaultSize={{
                    width: "100%",
                    height: "300px"
                }}
            > */}
                {/* <Draggable
                // position={position}
                > */}

                    <Instruction
                        editDialogueItemType={editDialogueItemType}
                        onClose={() => setIsOpen(false)}
                        isOpen={isOpen}
                    />

                    <Paper elevation={0}
                        sx={{
                            backgroundColor: "#e0f2f1",
                            borderRadius: 1,
                        }}
                    >
                        {dialogueItemState == DialogueItemStateType.UnsavedChanges
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
                                    phraseCaption={phraseRecoil?.text}
                                    phraseAudio={phraseRecoil?.audioSettings.audioData ?? ""}
                                    name={Locations.find(location => location.id == dialogueRecoil?.levelId)?.name ?? ""}
                                />
                            </Box>

                            <Box display='flex' justifyContent='end'>
                                <DialogueLinesTabSettings
                                    answers={phraseRecoil?.answers ?? []}
                                    setEditDialogueItemType={() => setEditDialogueItemType(undefined)}
                                />
                            </Box>

                            <DialogueLineSettings
                                onEditDialogueItemType={onEditDialogueItemType}
                                editDialogueItemType={editDialogueItemType}
                                dialogueItemEditState={dialogueItemEditState}
                                currentDialogueLineData={currentDialogueLineData}
                                color={dialogueItemColorsMap.find(item => item.id == selectDialogueLine.line.id)?.color ?? ""}
                            />

                            {!!phraseRecoil?.answers?.length
                                ? <Message
                                    title={Locations.find(location => location.id == dialogueRecoil?.levelId)?.name ?? ""}
                                    position={"left"}
                                    type={"text"}
                                    text={nextPhraseCaption}
                                />
                                : null
                            }
                            {CreateNextPhraseComponent()}

                        </TabContext>
                    </Paper >

                    <PhraseConstructor
                        onEditDialogueItemType={onEditDialogueItemType}
                        dialogueId={actionState.selectedNpc.scenarioId}
                        id={phraseRecoil?.id}
                        parentId={phraseRecoil?.parentId}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                    <DialogueLineContructor
                        onEditDialogueItemType={onEditDialogueItemType}
                        dialogueId={actionState.selectedNpc.scenarioId}
                        id={selectDialogueLine.line.id}
                        parentId={phraseRecoil?.id}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />


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
                    {!phraseRecoil?.audioSettings?.audioData && !!phraseRecoil?.text
                        ? <Alert severity="error">The phrase is not generated to audio!</Alert>
                        : null
                    }
                {/* </Draggable> */}
            {/* </Resizable > */}
        </Box>
    )
}

const commonStyle = {
    editedItemColor: "#ff9800",
    editItemColor: "#fafafa"
}