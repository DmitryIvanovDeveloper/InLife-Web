import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Alert, Box, Button, Divider, Grid, IconButton, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDialogue, useDialogueItemConstructor, usePhrase } from "../../Data/useDialogues";
import { useNextDialogueItemSelection, useSelectedDialogueItemSelection } from "../../Data/useDialogueItemSelection";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAudioSettings from "../../ThereGame.Business/Models/IAudioSettings";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import GetSettings from "../../ThereGame.Infrastructure/Helpers/PhraseAudioGegerationSettingsBuilder";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import AppBarDeleteButton from "../../Components/AppBarDeleteButton";
import SaveButton from "../../Components/Button/SaveButton";
import PhraseConstructor from './Phrase/PhraseContructor';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TranslateIcon from '@mui/icons-material/Translate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { IoMdAddCircle } from "react-icons/io";
import MessageIcon from '@mui/icons-material/Message';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ChatElement from '../../Components/ChatElement/ChatElement';
import { EditDialogueItemType } from '../models/EditType';
import AnswerContructor from '../AnswerContructor/AnswerConstructor';
import DeleteButton from '../../Components/Button/DeleteButton';

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function Constructor(props: IPhraseConstructor): JSX.Element | null {
    const [selection, setSelection] = useSelectedDialogueItemSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const dialogueRecoil = useDialogue(props.dialogueId);

    const [tab, setTab] = useState<string>(phraseRecoil.answers[0].id);

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [status, setStatus] = useState<Status>(Status.OK);

    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>();

    const [variations, setVariations] = useState<string[]>([]);
    const [nextPhrase, setNextPharse] = useState<string>("");

    const [nextdialoguItemSelection, setNextdialoguItemSelection] = useNextDialogueItemSelection();

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

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setTab(newValue);
    };

    const isEditDialogueItem = () => {
        return editDialogueItemType == EditDialogueItemType.Phrase ||
            editDialogueItemType == EditDialogueItemType.PhraseTenseses ||
            editDialogueItemType == EditDialogueItemType.Comments
            ;
    }

    const onEditDialogueItemType = (newEditDialogueItemType: EditDialogueItemType) => {
        if (newEditDialogueItemType == editDialogueItemType) {
            setEditDialogueItemType(undefined);
            return
        }

        setEditDialogueItemType(newEditDialogueItemType);
    }


    useEffect(() => {
        if (!phraseRecoil.answers.length) {
            setVariations([])
            return;
        }

        setVariations(phraseRecoil.answers.find(answer => answer.id == tab)?.texts ?? [])
    }, [phraseRecoil]);


    useEffect(() => {
        var nextPhrase = phraseRecoil.answers.find(answer => answer.id == tab)?.phrases[0];
        setNextPharse(nextPhrase?.text ?? "");

        setNextdialoguItemSelection(nextPhrase?.id ?? "");
    }, [tab, phraseRecoil]);




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
            <AppBarDeleteButton
                name='Constructor'
            />

            <Box
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                <TabContext value={tab}>
                    <Grid display='flex' direction='row' alignItems='flex-start' justifyContent='space-between'>
                        <Grid display='flex' direction='row' alignItems='center'>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {!!phraseRecoil.answers.length
                                    ? phraseRecoil.answers.map((answer, id) => (
                                        <Tab key={answer.id} onClick={() => { setVariations(answer.texts) }} label={`story line ${id + 1}`} value={answer.id} />
                                    ))
                                    : <Tab label={`story line 1`} />
                                }
                            </TabList>
                            <IconButton onClick={onAddAnswerButtonClick}>
                                <IoMdAddCircle />
                            </IconButton>
                        </Grid>


                        <DeleteButton onDelete={() => onDelete()} />
                    </Grid>

                    <Grid display='flex' direction='row' alignItems='center'>
                        <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.Phrase)}>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                        <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.Comments)}>
                            <MessageIcon />
                        </IconButton>
                        <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.PhraseTenseses)}>
                            <AvTimerIcon />
                        </IconButton>

                    </Grid>
                    <ChatElement
                        title={``}
                        position={"left"}
                        type={"text"}
                        text={phraseRecoil.text}
                    />
                    <Box>
                        <Grid display='flex' direction='column' alignItems='end'>
                            <Grid
                                display='flex' direction='row' alignItems='center'
                            >
                                <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.Answers)}>
                                    <DriveFileRenameOutlineIcon />
                                </IconButton>
                                <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.Translates)}>
                                    <TranslateIcon />
                                </IconButton>
                                <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                                    <AvTimerIcon />
                                </IconButton>
                                <IconButton onClick={() => onEditDialogueItemType(EditDialogueItemType.PossibleWords)}>
                                    <SpellcheckIcon />
                                </IconButton>
                            </Grid>

                            {variations.map(answer => (
                                <Box>
                                    <ChatElement
                                        title={`student [possible answer]`}
                                        position={"right"}
                                        type={"text"}
                                        text={answer}
                                    />
                                </Box>
                            ))}
                        </Grid>

                    </Box>

                    {!!nextPhrase
                        ? <ChatElement
                            title={`dsds`}
                            position={"left"}
                            type={"text"}
                            text={nextPhrase}
                        />
                        : null

                    }

                </TabContext>
            </Box >
            <Box
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                {isEditDialogueItem()
                    ? <PhraseConstructor
                        dialogueId={props.dialogueId}
                        id={phrase.id}
                        parentId={phrase.parentId}
                        editDialogueItemType={editDialogueItemType}
                    />
                    : <AnswerContructor
                        dialogueId={props.dialogueId}
                        id={phrase.answers.find(answer => answer.id == tab)?.id ?? ""}
                        parentId={phrase.id}
                        editDialogueItemType={editDialogueItemType}
                    />
                }

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