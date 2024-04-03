import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDialogue } from "../../Data/useDialogues";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import ActionButton from "../../Components/Button/ActionButton";
import AccessSettingsInfo from "./AccessSettings/AccessSettingsInfo";
import DialogueNameInfo from "./DialogueName/DialogueNameInfo";
import VoiceSettingsInfo from "./VoiceSettings/VoiceSettingsInfo";
import { EditDialogueItemType } from '../models/EditType';
import ModalConstructor from '../ModalContructor';
import Instruction from '../Instruction';
import SaveIcon from '@mui/icons-material/Save';
import useVocabularyBlockQueriesApi from '../../ThereGame.Api/Queries/VocabularyBlockQueriesApi';
import { useVocabularyBlockState } from '../../Data/useVocabularyBlocks';

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

    const [isVoiceInstructionOpen, setIsVoiceInstructionOpen] = useState<boolean>(false);
    const [isDialogueNamenOpen, setIsDialogueNameOpen] = useState<boolean>(false);
    const [isStudentAccessSettingsOpen, setStudentAccessSettingsOpen] = useState<boolean>(false);
    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>(undefined);

    const dialogueQueriesApi = useDialogueQueriesApi();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const vocabularyBlockQueriesApi = useVocabularyBlockQueriesApi();
    const [vocabularyBlocks] = useVocabularyBlockState();

    const save = async () => {

        studentVocabularyHandler();
        
        setIsLoading(true);
        await dialogueQueriesApi.update(dialogue);
        setIsLoading(false);
        setIsEdited(true);
    }

    const studentVocabularyHandler = () =>{
        dialogue.studentsId.forEach(id => {
            var expectedVocabularyBock = vocabularyBlocks.find(vb => vb.dialogueId == dialogue.id);
            if (!expectedVocabularyBock) {
                vocabularyBlockQueriesApi.create(id, 0, dialogue.id, dialogue.vocabularyWordsId);
            }
        })

        const exludedStudentsId = dialogueRecoil.studentsId.filter(studentId => !dialogue.studentsId.includes(studentId));

        exludedStudentsId.forEach(id => {
            const expectedVocabularyBlock = vocabularyBlocks.find(vb => vb.dialogueId == dialogue.id);
            if (!!expectedVocabularyBlock) {
                vocabularyBlockQueriesApi.delete(expectedVocabularyBlock.id, id);
            }
        })
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

    function StudentAccessSettingsComponent() {
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

    const onLastInstructionDone = () => {
        setStudentAccessSettingsOpen(false);
        save();
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

    useEffect(() => {
        if (!dialogueRecoil) {
            return;  
        }

        setIsDialogueNameOpen(!dialogueRecoil.name);
        setIsVoiceInstructionOpen(!dialogueRecoil.voiceSettings);
        setStudentAccessSettingsOpen(!dialogueRecoil.studentsId.length)
    }, [dialogueRecoil]);


    if (!dialogue) {
        return null;
    }



    if (isDialogueNamenOpen) {
        return (
            <ModalConstructor
                element={DialogueNameComponent()}
                isOpen={true}
                editDialogueItemType={EditDialogueItemType.DialogueName}
                onClose={() => setIsDialogueNameOpen(false)}
                description='Amazing! Here is new scenario. What is the scenario name?'
            />
        )
    }


    if (isVoiceInstructionOpen) {
        return (
            <ModalConstructor
                element={VoiceSettingsComponent()}
                isOpen={true}
                editDialogueItemType={EditDialogueItemType.VoiceSettings}
                onClose={() => {
                    if (!dialogue.voiceSettings) {
                        return;
                    }
                    setIsVoiceInstructionOpen(false);
                }}
                description='I can speak any voice for the scenario. Please choose!'
            />
        )
    }
    if (isStudentAccessSettingsOpen) {
        return (
            <ModalConstructor
                element={StudentAccessSettingsComponent()}
                isOpen={isStudentAccessSettingsOpen}
                editDialogueItemType={EditDialogueItemType.StudentsAccess}
                onClose={() => onLastInstructionDone()}
                description='Select students to access the scenario'
            />
        )
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
                    </Box>


                    <TabPanel value="1">{DialogueNameComponent()}</TabPanel>
                    <TabPanel value="2">{VoiceSettingsComponent()}</TabPanel>
                    <TabPanel value="3">{StudentAccessSettingsComponent()}</TabPanel>
                </TabContext>

                <Instruction
                    editDialogueItemType={editDialogueItemType}
                    onClose={() => setIsOpen(false)}
                    isOpen={isOpen}
                />
            </Box >

            {tab != '4'
                ? <ActionButton
                    onClick={save}
                    isLoading={isLoading}
                    isDisabled={false}
                    icon={<SaveIcon />}
                />
                : null
            }
        </Box >
    )
}