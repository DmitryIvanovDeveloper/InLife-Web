import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Alert, Box, Button, CircularProgress, Divider, Grid, IconButton, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import {  usePhrase } from "../../Data/useDialogues";
import { useNextDialogueItemSelection } from "../../Data/useDialogueItemSelection";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import AppBarDeleteButton from "../../Components/AppBarDeleteButton";
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
import SaveIcon from '@mui/icons-material/Save';
import { IDialogueItemEditState } from '../models/IPhraseSettingsState';
import useConstructorActions from '../../Data/ConstructorActions';
import { useConstructorActionsState } from '../../Data/useConstructorActionsState';

const defaultDialogieItemState: IDialogueItemEditState = {
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
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditedDialogueItemType?: (PhraseSettingsState: IDialogueItemEditState) => {}
}

export default function Constructor(props: IPhraseConstructor): JSX.Element | null {
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const [tab, setTab] = useState<string>("");

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);
    const [status, setStatus] = useState<Status>(Status.OK);

    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>();

    const [variations, setVariations] = useState<string[]>([]);
    const [nextPhrase, setNextPharse] = useState<string>("");

    const [nextdialoguItemSelection, setNextdialoguItemSelection] = useNextDialogueItemSelection();

    //TODO: Refactor
    const [dialogueItemEditState, setDialogueItemEditState] = useState<IDialogueItemEditState>(() => {
        var data = localStorage.getItem(`${props.id} Constructor-Edit-State`);
        return !data ? defaultDialogieItemState : JSON.parse(data);
    });


    const onCreateAnswers = async () => {

    }

    // QueryApi
    const onSavePhrase = async () => {
        constructorActions.setIsSavePhrase(true);
    }
    const onSaveAnswer = async () => {
        constructorActions.setIsSaveAnswer(true);
    }

    const onDelete = async () => {

    }

    useEffect(() => {
    }, [phraseRecoil]);

    const onReset = () => {
        setPhrase(phraseRecoil);
        setIsEdited(true);
        setStatus(Status.OK);
        setDialogueItemEditState(defaultDialogieItemState);
        localStorage.removeItem(props.id);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const isEditDialogueItem = () => {
        var isEdit = editDialogueItemType == EditDialogueItemType.Phrase ||
            editDialogueItemType == EditDialogueItemType.PhraseTenseses ||
            editDialogueItemType == EditDialogueItemType.Comments
            ;

        return isEdit;
    }

    const onEditDialogueItemType = (newEditDialogueItemType: EditDialogueItemType) => {
        if (newEditDialogueItemType == editDialogueItemType) {
            setEditDialogueItemType(undefined);
            return
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
            setVariations([])
            return;
        }

        var answer = phraseRecoil.answers.find(answer => answer?.id == tab);
        setVariations(answer?.texts ?? [])
    }, [ props.id]);

    useEffect(() => {
        var nextPhrase = phraseRecoil.answers.find(answer => answer?.id == tab)?.phrases[0];
        setNextPharse(nextPhrase?.text ?? "");

        setNextdialoguItemSelection(nextPhrase?.id ?? "");
    }, [variations]);

    useEffect(() => {
        setTab(phraseRecoil.answers[0]?.id ?? "");

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
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(phrase));
    }, [phrase]);

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
        if (!props.setStates) {
            return;
        }

        if (isEdited) {
            props.setStates([DialogueItemStateType.NoErrors])
            return;
        }

        props.setStates([DialogueItemStateType.UnsavedChanges])
    }, [isEdited]);


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
                                        <Tab key={answer?.id} onClick={() => { setVariations(answer.texts) }} label={`story line ${id + 1}`} value={answer?.id} />
                                    ))
                                    : <Tab value="" label={`story line 1`} />
                                }
                            </TabList>
                            <IconButton onClick={onCreateAnswers}>
                                <IoMdAddCircle />
                            </IconButton>
                        </Grid>


                        <DeleteButton onDelete={() => onDelete()} />
                    </Grid>

                    <Grid display='flex' direction='row' alignItems='center' margin="3px">
                        <IconButton
                            sx={{
                                backgroundColor: editDialogueItemType == EditDialogueItemType.Phrase ? "white" : "",
                                color: dialogueItemEditState.isPhraseEdited ? "#e65100" : ""
                            }}
                            onClick={() => onEditDialogueItemType(EditDialogueItemType.Phrase)}
                        >
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: editDialogueItemType == EditDialogueItemType.Comments ? "white" : "",
                                color: dialogueItemEditState.isPhraseCommentsEdited ? "#e65100" : ""
                            }}
                            onClick={() => onEditDialogueItemType(EditDialogueItemType.Comments)}
                        >
                            <MessageIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: editDialogueItemType == EditDialogueItemType.PhraseTenseses ? "white" : "",
                                color: dialogueItemEditState.isPhraseTensesesEdited ? "#e65100" : ""
                            }}
                            onClick={() => onEditDialogueItemType(EditDialogueItemType.PhraseTenseses)}
                        >
                            <AvTimerIcon />
                        </IconButton>
                        {editDialogueItemType == EditDialogueItemType.Phrase ||
                            editDialogueItemType == EditDialogueItemType.PhraseTenseses ||
                            editDialogueItemType == EditDialogueItemType.Comments
                            ? <IconButton
                                sx={{
                                    color: dialogueItemEditState.isPhraseCommentsEdited ||
                                        dialogueItemEditState.isPhraseEdited ||
                                        dialogueItemEditState.isPhraseTensesesEdited
                                        ? "#e65100"
                                        : ""
                                }}

                                onClick={() => onSavePhrase()}
                            >
                                {constructorActionsState.phrase.isSave
                                    ? <CircularProgress size={20} />
                                    : <SaveIcon />
                                }
                            </IconButton>
                            : null
                        }


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
                                <IconButton
                                    sx={{ 
                                        backgroundColor: editDialogueItemType == EditDialogueItemType.Answers ? "white" : "",
                                        color: dialogueItemEditState.isAnswersEdited ? "#e65100" : ""
                                     }}
                                    onClick={() => onEditDialogueItemType(EditDialogueItemType.Answers)}
                                >
                                    <DriveFileRenameOutlineIcon />
                                </IconButton>
                                <IconButton
                                    sx={{ 
                                        backgroundColor: editDialogueItemType == EditDialogueItemType.Translates ? "white" : "",
                                        color: dialogueItemEditState.isAnswersTranslatesEdited ? "#e65100" : ""
                                     }}
                                    onClick={() => onEditDialogueItemType(EditDialogueItemType.Translates)}>
                                    <TranslateIcon />
                                </IconButton>
                                <IconButton
                                    sx={{ 
                                        backgroundColor: editDialogueItemType == EditDialogueItemType.AnswersTenseses ? "white" : "",
                                        color: dialogueItemEditState.isAnswersTensesListEdited ? "#e65100" : "" 
                                    }}
                                    onClick={() => onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                                    <AvTimerIcon />
                                </IconButton>
                                <IconButton
                                    sx={{ 
                                        backgroundColor: editDialogueItemType == EditDialogueItemType.PossibleWords ? "white" : "",
                                        color: dialogueItemEditState.isAnswersPossibleWordsEdited ? "#e65100" : ""
                                     }}
                                    onClick={() => onEditDialogueItemType(EditDialogueItemType.PossibleWords)}>
                                    <SpellcheckIcon />
                                </IconButton>
                                {editDialogueItemType == EditDialogueItemType.Answers ||
                                    editDialogueItemType == EditDialogueItemType.AnswersTenseses ||
                                    editDialogueItemType == EditDialogueItemType.Translates ||
                                    editDialogueItemType == EditDialogueItemType.PossibleWords
                                    ? <IconButton
                                        sx={{
                                            color: dialogueItemEditState.isAnswersEdited ||
                                                dialogueItemEditState.isAnswersTranslatesEdited ||
                                                dialogueItemEditState.isAnswersTensesListEdited ||
                                                dialogueItemEditState.isAnswersPossibleWordsEdited
                                                ? "#e65100"
                                                : ""
                                        }}
                                        onClick={() => onSaveAnswer()}>
                                        {constructorActionsState.answer.isSave
                                            ? <CircularProgress size={20} />
                                            : <SaveIcon />
                                        }
                                    </IconButton>
                                    : null
                                }

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
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                    : <AnswerContructor
                        dialogueId={props.dialogueId}
                        id={phrase.answers.find(answer => answer?.id == tab)?.id ?? ""}
                        parentId={phrase.id}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                }

            </Box>

            <Divider variant="fullWidth" />

            {!isEdited || status != Status.OK
                ? <Box>
                    <Alert severity="warning">The constructor has unsaved changes</Alert>
                    <Button onClick={onReset}>reset all changes</Button>
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