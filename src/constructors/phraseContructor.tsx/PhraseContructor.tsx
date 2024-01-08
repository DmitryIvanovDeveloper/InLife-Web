import { useState, useEffect } from "react";
import { useAnswer, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues";
import { useSelection } from "../../Data/useSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import AddButton from "../../components/Buttons/AddButton";
import SaveButton from "../../components/Buttons/SaveButton";
import TensesList from "../TensesList";
import AnswerContructor from "../answerContructor/AnswerConstructor";
import { Box, TextField, Button, Typography, Alert, Divider } from "@mui/material";
import GetSettings from "../../ThereGame.Infrastructure/Helpers/PhraseAudioGegerationSettingsBuilder";
import AppBarDeleteButton from "../../components/AppBarDeleteButton";
import LinarProgressCustom from "../../components/CircularProgress";
import DevidedLabel from "../../components/Headers/DevidedLabel";
import { useTreeState } from "../../Data/useTreeState";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import IAudioSettings from "../../ThereGame.Business/Models/IAudioSettings";
import { v4 as uuidv4 } from 'uuid';


export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function PhraseContructor(props: IPhraseConstructor): JSX.Element | null {
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    
    const [treeState, setTreeState] = useTreeState();

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

    const onAnswerButtonClick = (id: any) => {
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

    const onChangeText = (event: any) => {
        setPhrase(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsEdited(false);
    }

    const onCommentsChange = (event: any) => {
        setPhrase(prev => ({
            ...prev,
            comments: event.target.value
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


    // UseEffects

    const getSettings = () => {
        var data = localStorage.getItem(`[DeepVoice] - ${props.dialogueId}`);
        if (!data) {
            return phrase.audioSettings;
        }

        var parsedData = JSON.parse(data);

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

            <TensesList tensesList={phrase.tensesList} setTensesList={onSetTenses} />

            <TextField
                InputLabelProps={{ shrink: true }}

                value={phrase.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={onChangeText}
                required={true}
                placeholder="Hello, my name is John"
                fullWidth
            />

            <Divider variant="fullWidth" />

            <TextField
                InputLabelProps={{ shrink: true }}
                value={phrase.comments}
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                onChange={onCommentsChange}
                fullWidth
            />

            <Divider variant="fullWidth" />

            <SaveButton 
                onClick={onSave} 
                isLoading={isSaving} 
                isDisabled={false} 
            />

            {!isEdited || status != Status.OK
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={reset}>reset</Button>
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



            <DevidedLabel name="Linked answers"/>

            {isCreating
                ? <LinarProgressCustom name="Creating"/>
                : <AddButton onClick={onAddAnswerButtonClick} name="Create Answer" />
            }

            {phrase.answers.length != 0
                ?
                <Box>
                    {phrase.answers.map(answer => (
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            sx={{p: 1}}
                        >
                            <Button variant='outlined' id={answer.id} onClick={() => onAnswerButtonClick(answer.id)} sx={{ p: 1, }}>
                                <Typography sx={{ textDecoration: 'underline' }}>{!answer.texts.length ? "New Phrase" : answer.texts[0]}</Typography>
                            </Button>
                        </Box>

                    ))}
                </Box>
                : null
            }
        </Box>
    )
}