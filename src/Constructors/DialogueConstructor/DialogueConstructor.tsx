import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Alert, Box, Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDialogue, useDialogueItemConstructor } from "../../Data/useDialogues";
import { useTreeState } from "../../Data/useTreeState";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import AppBarDeleteButton from "../../Components/AppBarDeleteButton";
import SaveButton from "../../Components/Button/SaveButton";
import LinarProgressCustom from "../../Components/CircularProgress";
import AccessSettingsInfo from "./AccessSettings/AccessSettingsInfo";
import DialogueNameInfo from "./DialogueName/DialogueNameInfo";
import VoiceSettingsInfo from "./VoiceSettings/VoiceSettingsInfo";
import DialogueGraph from '../../Components/GraphTree/DialogueGraph';

export interface IDialogueConstructor {
    id: string;
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function DialogueConstructor(props: IDialogueConstructor): JSX.Element | null {
    const dialogueRecoil = useDialogue(props.id);

    const [dialogue, setDialogue] = useState<IDialogueModel>(dialogueRecoil);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [isEdited, setIsEdited] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [treeState, setTreeState] = useTreeState();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [tab, setTab] = useState<string>("1");

    const dialogueQueriesApi = useDialogueQueriesApi();

    const save = async () => {
        setIsLoading(true);
        await dialogueQueriesApi.update(dialogue);
        setIsLoading(false);
        setIsEdited(true);
    }

    const onDelete = async () => {
        setIsDeleting(true);
        await dialogueQueriesApi.delete(props.id);
        localStorage.removeItem(props.id)
        setDialogueItemConstructor(() => null);
        setIsDeleting(false);;

    }

    const onChangeName = (name: string) => {
        setDialogue(prev => ({
            ...prev,
            name
        }));

        setIsEdited(false);
    }

    const setIsVoiceSelected = (isSelected: string) => {
        setDialogue(prev => ({
            ...prev,
            voiceSettings: isSelected
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

    // Componets
    function VoiceSettingsComponent() {
        return (
            <VoiceSettingsInfo
                dialogueId={props.id}
                setIsVoiceSelected={setIsVoiceSelected}
                voiceSettings={dialogueRecoil?.voiceSettings}
            />
        )
    }

    function DialogueNameComponent() {
        return (
            <DialogueNameInfo
                name={dialogue.name}
                onChangeName={onChangeName}
            />
        )
    }

    function AccessSettingsComponent() {
        return (
            <AccessSettingsInfo
                studentsId={dialogue.studentsId}
                setStudentList={setStudentList}
                publish={publish}
                isPublished={dialogue.isPublished}
            />
        )
    }

    function DialogueGraphComponent() {
        return (
            <DialogueGraph dialogueId={dialogue.id} />
        )
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

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
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Name" value="1" />
                            {!dialogue.name
                                ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                : null
                            }
                            <Tab label="Voice Settings" value="2" />
                            {!dialogue.voiceSettings
                                ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                : null
                            }
                            <Tab label="Access" value="3" />
                            <Tab label="Scenario" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{DialogueNameComponent()}</TabPanel>
                    <TabPanel value="2">{VoiceSettingsComponent()}</TabPanel>
                    <TabPanel value="3">{AccessSettingsComponent()}</TabPanel>
                    <TabPanel value="4">{DialogueGraphComponent()}</TabPanel>
                </TabContext>
            </Box>

            {/* <SaveButton
                onClick={save}
                isLoading={isLoading}
                isDisabled={!dialogue.voiceSettings}
            /> */}

            {/* {!isEdited
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset all changes</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            } */}
        </Box>
    )
}