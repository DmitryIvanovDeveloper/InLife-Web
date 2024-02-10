import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Alert, Box, Button, Divider, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDialogue, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues";
import { useSelection } from "../../Data/useSelection";
import { useTreeState } from "../../Data/useTreeState";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAudioSettings from "../../ThereGame.Business/Models/IAudioSettings";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import GetSettings from "../../ThereGame.Infrastructure/Helpers/PhraseAudioGegerationSettingsBuilder";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import AppBarDeleteButton from "../../Components/AppBarDeleteButton";
import SaveButton from "../../Components/Button/SaveButton";
import AnswerContructor from "../AnswerContructor/AnswerConstructor";
import CommentsInfo from './Comments/CommentsInfo';
import PhraseInfo from './Phrase/PhraseInfo';
import TensesListInfo from './TensesList/TensesListInfo';

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function PhraseConstructor(props: IPhraseConstructor): JSX.Element | null {
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const dialogueRecoil = useDialogue(props.dialogueId);

    const [treeState, setTreeState] = useTreeState();

    const [tab, setTab] = useState<string>("1");

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [status, setStatus] = useState<Status>(Status.OK);

    const onAddAnswerButtonClick = async () => {
        setIsCreating(true)
        var status = await answerQueriesApi.create(props.id);
        setStatus(status);
        setIsCreating(false)
    }

    // QueryApi
    const onSave = async () => {
        const updatedPhrase = JSON.parse(JSON.stringify(phrase));

        updatedPhrase.audioSettings = getSettings();

        setIsSaving(true);
        var status = await phraseQueriesApi.update(updatedPhrase);
        setStatus(status);
        setIsSaving(false);
        if (status == Status.OK) {
            localStorage.removeItem(props.id);
        }
        setIsEdited(true);
    }

    const onDelete = async () => {
        var status = await phraseQueriesApi.delete(props.id);
        setStatus(status);
        localStorage.removeItem(props.id);
        setDialogueItemConstructor(() => null);
    }

    const reset = () => {
        setPhrase(phraseRecoil);
        setIsEdited(true);
        setStatus(Status.OK);
        localStorage.removeItem(props.id);
    }

    const onAnswerButtonClick = (id: string) => {
        setSelection(id);

        setTreeState(prev => ({
            expanded: [...prev.expanded, id],
            selected: [id]
        }));

        setDialogueItemConstructor(() =>
            <AnswerContructor
                dialogueId={props.dialogueId}
                id={id}
                parentId={props.id}
            />);
    }

    const onChangeText = (phrase: string) => {
        setPhrase(prev => ({
            ...prev,
            text: phrase
        }));

        setIsEdited(false);
    }

    const onCommentsChange = (comments: string) => {
        setPhrase(prev => ({
            ...prev,
            comments
        }));
        setIsEdited(false);
    }

    const onSetTenses = (tenses: string[]) => {
        setPhrase(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsEdited(false);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    // Components
    function PhraseComponent() {
        return (
            <PhraseInfo
                phrase={phrase.text}
                onChangeText={onChangeText}
            />
        )
    }

    function TensesListComponent() {
        return (
            <TensesListInfo
                tensesList={phrase.tensesList}
                setTensesList={onSetTenses}
            />
        )
    }

    function CommentsComponent() {
        return (
            <CommentsInfo
                comments={phrase.comments}
                onCommentsChange={onCommentsChange}
            />
        )
    }

    // UseEffects

    const getSettings = () => {
        var parsedData = JSON.parse(dialogueRecoil.voiceSettings);

        var newAudioSettings: IAudioSettings = {
            id: uuidv4(),
            generationSettings: GetSettings(parsedData.type, parsedData.name, phrase.text)
        }

        return newAudioSettings;
    }

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setPhrase(phraseRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setPhrase(JSON.parse(data));
    }, [phraseRecoil])

    useEffect(() => {
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(phrase));

    }, [phrase]);

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
        var data = localStorage.getItem(props.id);
        if (JSON.stringify(phraseRecoil) !== data) {
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [phrase]);

    if (!phrase) {
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
                name='Phrase Constructor'
                onDelete={onDelete}
            />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Pharse" value="1" />
                            {!phrase.text
                                ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                : null
                            }

                            <Tab label="Pharse tenseses" value="2" />
                            {phrase.tensesList.length == 0
                                ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                : null
                            }

                            <Tab label="Comments" value="3" />
                            {!phrase.comments
                                ? <ErrorOutlineOutlinedIcon sx={{ mt: 1.6 }} />
                                : null
                            }
                        </TabList>
                    </Box>
                    <TabPanel value="1">{PhraseComponent()}</TabPanel>
                    <TabPanel value="2">{TensesListComponent()}</TabPanel>
                    <TabPanel value="3">{CommentsComponent()}</TabPanel>
                </TabContext>
            </Box>

            <Divider variant="fullWidth" />

            <SaveButton
                onClick={onSave}
                isLoading={isSaving}
                isDisabled={false}
            />

            {!isEdited || status != Status.OK
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset all changes</Button>
                </Box>
                : <Alert severity="success">The constructor is saved!</Alert>
            }

            {status != Status.OK
                ? <Alert severity="error">Something went wrong! Please try leter!</Alert>
                : null
            }
            {!phrase.audioSettings?.audioData && !!phraseRecoil.text
                ? <Alert severity="error">The phrase is not generated to audio!</Alert>
                : null
            }
        </Box>
    )
}