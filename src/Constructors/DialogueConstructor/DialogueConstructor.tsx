import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, IconButton, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDialogue } from "../../Data/useDialogues";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import SaveButton from "../../Components/Button/SaveButton";
import AccessSettingsInfo from "./AccessSettings/AccessSettingsInfo";
import DialogueNameInfo from "./DialogueName/DialogueNameInfo";
import VoiceSettingsInfo from "./VoiceSettings/VoiceSettingsInfo";
import DialogueGraph from '../../Components/GraphTree/DialogueGraph';
import Instruction from '../Instruction';
import { EditDialogueItemType } from '../models/EditType';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

export interface IDialogueConstructor {
    id: string;
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function DialogueConstructor(props: IDialogueConstructor): JSX.Element | null {
    const dialogueRecoil = useDialogue(props.id);

    const [dialogue, setDialogue] = useState<IDialogueModel>(dialogueRecoil);
    const [isEdited, setIsEdited] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tab, setTab] = useState<string>("1");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>(undefined);

    const dialogueQueriesApi = useDialogueQueriesApi();

    const save = async () => {
        setIsLoading(true);
        await dialogueQueriesApi.update(dialogue);
        setIsLoading(false);
        setIsEdited(true);
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

    useEffect(() => {
        if (tab == '1') {
            setEditDialogueItemType(EditDialogueItemType.DialogueName)
        }
        if (tab == '2') {
            setEditDialogueItemType(EditDialogueItemType.VoiceSettings)
        }
        if (tab == '3') {
            setEditDialogueItemType(EditDialogueItemType.StudentsAccess)
        }
    }, [tab]);

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
            }}
            autoComplete="off"
        >
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Scene Name" value="1" />
                                {!dialogue.name
                                    ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                    : null
                                }
                                <Tab label="Voice" value="2" />
                                {!dialogue?.voiceSettings
                                    ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                    : null
                                }
                                <Tab label="Access" value="3" />
                            </TabList>

                        </Box>
                        <IconButton onClick={() => setIsOpen(true)} sx={{ margin: 1 }}>
                            <HelpOutlinedIcon />
                        </IconButton>
                        <Instruction
                            editDialogueItemType={editDialogueItemType}
                            onClose={() => setIsOpen(false)}
                            isOpen={isOpen}
                        />
                    </Box>


                    <TabPanel value="1">{DialogueNameComponent()}</TabPanel>
                    <TabPanel value="2">{VoiceSettingsComponent()}</TabPanel>
                    <TabPanel value="3">{AccessSettingsComponent()}</TabPanel>
                </TabContext>


            </Box >

            {tab != '4'
                ? <SaveButton
                    onClick={save}
                    isLoading={isLoading}
                    isDisabled={false}
                />
                : null
            }

            {/* {!isEdited
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset all changes</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            } */}
        </Box >
    )
}