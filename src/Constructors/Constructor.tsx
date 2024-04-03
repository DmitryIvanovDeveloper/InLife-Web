import TabContext from '@mui/lab/TabContext';
import { Alert, Box, Button, CircularProgress, Divider, IconButton, Paper, Slide, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
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
import DialogueLineSettings from './DialogueLine/DialogueLineSettings';
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
import Hint from '../Components/Hints/Hint';
import Notebook from '../Images/Notebook.png';
import VocabularyBlockWordsContext from '../Components/VocabularyBlockWordsContext/VocabularyBlockWordsContext';

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

    const [selectedDialogueLine] = useSelectDialogueLine();

    const dialogueRecoil = useDialogue(actionState.selectedNpc.scenarioId);
    const phraseRecoil = usePhrase(actionState.selectedNpc.scenarioId, selectedDialogueLine.dialogueItemId);
    const constructorActions = useConstructorActions();
    const [status, setStatus] = useState<Status>(Status.OK);
    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>(undefined);
    const [currentDialogueLineData, setCurrentDialogueLineData] = useState<string[]>([]);
    const [nextPhraseCaption, setNextPharseCaption] = useState<string>("");
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogueItemState] = useDialogueItemState();
    const [isPhraseCreating, setIsPhraseCreating] = useState<boolean>(false);
    const [dialogueItemColorsMap] = useDialogueItemColorsMap();
    const [hint, setHint] = useState<ReactElement | null>(null)
    const [checked, setChecked] = React.useState(false);

    const containerRef = React.useRef<HTMLElement>(null);
    
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

    const hasStoryLineInstructions = (): boolean => {
        return dialogueRecoil?.phrase?.id == phraseRecoil?.id && !!dialogueRecoil.phrase.text && phraseRecoil?.answers.length == 0
    }
    // UseEffects

    useEffect(() => {
        if (!phraseRecoil?.answers?.length) {
            setCurrentDialogueLineData([]);
            return;
        }

        var answer = phraseRecoil?.answers.find(answer => answer?.id == selectDialogueLine.line.id);
        if (!answer) {
            setSelectDialogueLine(prev => ({
                ...prev,
                line: {
                    name: "",
                    id: phraseRecoil.answers[0].id
                }
            }));
            setCurrentDialogueLineData(phraseRecoil?.answers[0].texts);

            return;
        }

        setCurrentDialogueLineData(answer.texts);

    }, [selectDialogueLine]);

    useEffect(() => {
        if (!actionState.selectedNpc.scenarioId || !!actionState.selectedNpc.specificPhraseId) {
            return;
        }

        setSelectDialogueLine(prev => ({
            ...prev,
            dialogueItemId: dialogueRecoil.phrase.id
        }))

        setTimeout(() => {
            setHint(<Hint />);
        }, 5000);

        setTimeout(() => {
            setChecked(true);
        }, 1000);

    }, [actionState.selectedNpc.scenarioId]);

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
        setChecked(false);
        var timeout = setTimeout(() => {
            setChecked(true);
            clearTimeout(timeout);
        }, 1000);

    }, [selectDialogueLine.line.id]);

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

    if (!dialogueRecoil || !dialogueRecoil?.name || !dialogueRecoil?.voiceSettings) {
        return null;
    }

    
    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'absolute',
                right: 0,
                top: 60,
                p: 0,
                m: 0,
                display: 'flex',
                width: '650px',
            }}>
            
            <VocabularyBlockWordsContext dialogueId={dialogueRecoil.id} />
            
            <Slide
                direction='left'
                in={checked} container={containerRef.current}
                easing={{
                    enter: "linear",
                    exit: "linear"
                }}>
                <Box>
                    <Box
                        component='image'
                        sx={{
                            width: '100%',
                            maxWidth: '950px',
                            maxHeight: '100vh',
                            content: {
                                xs: `url(${Notebook})`, //img src from xs up to md
                                md: `url(${Notebook})`,  //img src from md and up
                            },
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: 100,
                            right: 20,
                            width: '90%',
                            display: "flex",
                            justifyContent: 'center',
                            flexDirection: "column",
                            alignItems: 'stretch',
                            maxHeight: '90vh',
                            pr: 2
                        }}
                    >
                        {/* {hint} */}
                        <Instruction
                            editDialogueItemType={editDialogueItemType}
                            onClose={() => setIsOpen(false)}
                            isOpen={isOpen}
                        />

                        {dialogueItemState == DialogueItemStateType.UnsavedChanges
                            ? <Box display='flex' justifyContent='flex-end' flexDirection="row">
                                <Button onClick={() => constructorActions.setIsReset(true)}>Reset unsaved changes</Button>
                            </Box>
                            : null
                        }

                        <Box display="flex" justifyContent='center'>
                            <Typography sx={{ mt: 1, color: " rgb(83 83 83);" }} align='center' variant='h5' fontFamily='cursive'>Notebook</Typography>
                        </Box>

                        <TabContext value={selectDialogueLine.line.id} >
                            <Box sx={{ alignItems: 'center' }}>
                                <Box sx={{ ml: 1 }}>
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
                                </Box>

                                <Box >
                                    <Box display='flex' justifyContent='end'>
                                        <DialogueLinesTabSettings
                                            answers={phraseRecoil?.answers ?? []}
                                            setEditDialogueItemType={() => setEditDialogueItemType(undefined)}
                                            hasInstruction={hasStoryLineInstructions()}
                                        />
                                    </Box>

                                    <DialogueLineSettings
                                        onEditDialogueItemType={onEditDialogueItemType}
                                        editDialogueItemType={editDialogueItemType}
                                        dialogueItemEditState={dialogueItemEditState}
                                        currentDialogueLineData={currentDialogueLineData}
                                        color={dialogueItemColorsMap.find(item => item.id == selectDialogueLine.line.id)?.color ?? ""}
                                    />
                                </Box>
                            </Box>
                        </TabContext>

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
                            currentPhraseText={phraseRecoil?.text}
                        />
                    </Box>
                </Box>
            </Slide>
        </Box >
    )
}