import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import SaveButton from "../../components/Button/SaveButton";
import { useDialogue, useDialogueItemConstructor } from "../../Data/useDialogues";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import useDialogieQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import PhraseContructor from "../phraseContructor.tsx/PhraseContructor";
import VoiceList from "../../components/voiceList/VoiceList";
import AppBarDeleteButton from "../../components/AppBarDeleteButton";
import StudentList from "../../components/StudentList";
import { useTreeState } from "../../Data/useTreeState";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import Switcher from "../../components/Button/Switcher";
import DevidedLabel from "../../components/Headers/DevidedLabel";
import { useSelection } from "../../Data/useSelection";

export interface IDialogueConstructor {
    id: string;
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function DialogueConstructor(props: IDialogueConstructor): JSX.Element | null {
    const dialogueRecoil = useDialogue(props.id);

    const [dialogue, setDialogue] = useState<IDialogueModel>(dialogueRecoil);

    const [isVoiceSelected, setIsSelected] = useState<boolean>(false);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isEdited, setIsEdited] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [treeState, setTreeState] = useTreeState();
    const [selection, setSelection] = useSelection();

    const dialogueQueriesApi = useDialogieQueriesApi();

    const save = async () => {
        setIsLoading(true)
        await dialogueQueriesApi.update(dialogue)
        setIsLoading(false)
        setIsEdited(true);
    }

    const onDelete = async () => {
        await dialogueQueriesApi.delete(props.id);
        localStorage.removeItem(`[DeepVoice] - ${props.id}`)
        localStorage.removeItem(props.id)
        setDialogueItemConstructor(() => null);
    }

    const onChangeName = (event: any) => {
        setDialogue(prev => ({
            ...prev,
            name: event.target.value
        }));

        setIsEdited(false);
    }

    const onClickPhrase = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        setTreeState(prev => ({
            expanded: [...prev.expanded, dialogue.id, dialogue.phrase.id],
            selected: [dialogue.phrase.id]
        }));

        setSelection(dialogue.phrase.id);
        
        setDialogueItemConstructor(() => <PhraseContructor
            dialogueId={props.id}
            id={dialogue.phrase.id}
            parentId={""}
        />);
    }

    const setIsVoiceSelected = (isSelected: boolean) => {
        setIsSelected(isSelected);
        setDialogue(prev => ({
            ...prev,
            isVoiceSelected: isSelected
        }))

        setIsEdited(false);
    }
    const publish = async () => {
        setDialogue(prev => ({
            ...prev,
            isPublished: !prev.isPublished
        }));

        setIsEdited(false);
    }

    const setStudentList = (studentsId: string[]) => {
        setDialogue(prev => ({
            ...prev,
            studentsId: studentsId
        }));

        setIsEdited(false);
    }

    const reset = () => {
        setDialogue(dialogueRecoil);
        localStorage.removeItem(props.id);
    }

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setDialogue(dialogueRecoil);
            setIsEdited(true);
            return;
        }

        setIsEdited(false);

        setDialogue(JSON.parse(data));
    }, [dialogueRecoil]);

    useEffect(() => {
        if (isEdited) {
            reset();
        }

        if (JSON.stringify(dialogueRecoil) !== JSON.stringify(dialogue)) {
            localStorage.setItem(props.id, JSON.stringify(dialogue));
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [dialogue]);

    useEffect(() => {
        if (!props.setStates) {
            return;
        }

        if (isEdited) {
            props.setStates([DialogueItemStateType.NoErrors])
            return;
        }

        props.setStates([DialogueItemStateType.UnsavedChanges])
    }, [isEdited]);

    if (!dialogue) {
        return null;
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 800,
                overflow: "hidden",
                overflowY: "scroll",
            }}
            autoComplete="off"
        >
            <AppBarDeleteButton
                name={`"${dialogue.name}" Settings`}
                onDelete={onDelete}
            />

            <DevidedLabel name={"Audio Settings"} />

            <VoiceList
                dialogueId={props.id}
                setIsVoiceSelected={setIsVoiceSelected}
                isVoiceSelected={dialogueRecoil?.isVoiceSelected} // Don't change to Dialogue
            />

            <DevidedLabel name={"Dialogue Name"} />
            <TextField
                onChange={onChangeName}
                value={dialogue.name}
                required={true}
                id="outlined-basic"
                label="Name"
                variant="outlined"
            />

            <SaveButton
                onClick={save}
                isLoading={isLoading}
                isDisabled={!isVoiceSelected}
            />

            <DevidedLabel name={"Initial Phrase"} />
            <Box>
                <Button
                    disabled={!dialogueRecoil?.isVoiceSelected} // Don't change to Dialogue
                    variant="contained"
                    onClick={onClickPhrase}>{!dialogue.phrase.text ? "New Phrase" : dialogue.phrase.text}
                </Button>
            </Box>

            {!isEdited
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            }

            <DevidedLabel name={"Publish Settings"} />
            <Switcher setIsChecked={publish} checked={dialogue.isPublished} />

            <StudentList
                studentList={dialogue.studentsId}
                setStudentList={setStudentList}
            />
        </Box>
    )
}