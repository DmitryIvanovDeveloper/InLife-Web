import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Alert, Box, Button, CircularProgress, Divider, Grid, IconButton, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { usePhrase } from "../../Data/useDialogues";
import { useDialogueLineSelection, useNextDialogueItemSelection, useSelectedDialogueItemSelection } from "../../Data/useDialogueItemSelection";
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
import useAnswerQueriesApi from '../../ThereGame.Api/Queries/AnswerQueriesApi';
import { DialogueItemType } from '../../Components/GraphTree/DialogueitemType';
import usePhraseQueriesApi from '../../ThereGame.Api/Queries/PhraseQueriesApi';

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
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();
    const [selection, setSelection] = useSelectedDialogueItemSelection();

    const [selectedVariationName, setSelectedVariationName] = useState<string>(`story line 1`);

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);
    const [status, setStatus] = useState<Status>(Status.OK);

    const [editDialogueItemType, setEditDialogueItemType] = useState<EditDialogueItemType | undefined>();

    const [variations, setVariations] = useState<string[]>([]);
    const [nextPhrase, setNextPharse] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [nextdialoguItemSelection, setNextdialoguItemSelection] = useNextDialogueItemSelection();
    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();

    const [dialogueLineSelection, setDialogueLineSelection] = useDialogueLineSelection();

    //TODO: Refactor
    const [dialogueItemEditState, setDialogueItemEditState] = useState<IDialogueItemEditState>(() => {
        var data = localStorage.getItem(`${props.id} Constructor-Edit-State`);
        return !data ? defaultDialogieItemState : JSON.parse(data);
    });


    const onCreateAnswers = async () => {
        setIsCreating(true);
        await answerQueriesApi.create(props.id);
        setIsCreating(false);

    }

    // QueryApi
    const onSavePhrase = async () => {
        constructorActions.setIsSavePhrase(true);
    }
    const onSaveAnswer = async () => {
        constructorActions.setIsSaveAnswer(true);
    }

    const onDelete = async (dialogueItemType: DialogueItemType) => {
        setIsDeleting(true);

        if (dialogueItemType == DialogueItemType.Answer) {
            await answerQueriesApi.delete(dialogueLineSelection);
            localStorage.removeItem(dialogueLineSelection);
        }
        if (dialogueItemType == DialogueItemType.Phrase) {

            await phraseQueriesApi.delete(props.id);
            localStorage.removeItem(phrase.id);
        }

        setIsDeleting(false);
    }


    const onReset = () => {
        setPhrase(phraseRecoil);
        setPhrase(phraseRecoil);
        setIsEdited(true);
        setStatus(Status.OK);
        setDialogueItemEditState(defaultDialogieItemState);
        localStorage.removeItem(props.id);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setDialogueLineSelection(newValue);
        setEditDialogueItemType(undefined);
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

        var answer = phraseRecoil.answers.find(answer => answer?.id == dialogueLineSelection);
        setVariations(answer?.texts ?? [])
    }, [dialogueLineSelection]);

    useEffect(() => {
        var nextPhrase = phraseRecoil.answers.find(answer => answer?.id == dialogueLineSelection)?.phrases[0];
        setNextPharse(nextPhrase?.text ?? "");

        setNextdialoguItemSelection(nextPhrase?.id ?? "");
    }, [variations]);

    useEffect(() => {
        setDialogueLineSelection(!dialogueLineSelection ? dialogueLineSelection : phraseRecoil.answers[0]?.id );

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
                <TabContext value={dialogueLineSelection}>
                    <Grid display='flex' direction='row' alignItems='flex-start' justifyContent='space-between'>
                        <Grid display='flex' direction='row' alignItems='center'>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {!!phraseRecoil.answers.length
                                    ? phraseRecoil.answers.map((answer, id) => (
                                        <Tab key={answer?.id} onClick={() => { 
                                            setVariations(answer.texts); 
                                            setSelectedVariationName(`story line ${id + 1}`); 
                                            setDialogueLineSelection(answer.id);
                                        }} 
                                            label={`story line ${id + 1}`} value={answer?.id} />
                                    ))
                                    : <Tab value="" label={`story line 1`} />
                                }
                            </TabList>
                            {isCreating
                                ? <CircularProgress color='error' size={20} />
                                : <IconButton onClick={onCreateAnswers}>
                                    <IoMdAddCircle />
                                </IconButton>
                            }

                        </Grid>

                        {!isDeleting
                            ? <DeleteButton onDelete={onDelete} name={selectedVariationName} />
                            : <CircularProgress color='error' size={20} />
                        }
                    </Grid>

                    {constructorActionsState.phrase.isSave
                        ? <CircularProgress size={20} />
                        : <Grid display='flex' direction='row' alignItems='center' margin="3px">

                            <IconButton
                                sx={{
                                    backgroundColor: editDialogueItemType == EditDialogueItemType.Phrase ? commonStyle.editItemColor : "",
                                    color: dialogueItemEditState.isPhraseEdited ? commonStyle.editedItemColor : ""
                                }}
                                onClick={() => onEditDialogueItemType(EditDialogueItemType.Phrase)}
                            >
                                <DriveFileRenameOutlineIcon />
                            </IconButton>

                            <IconButton
                                sx={{
                                    backgroundColor: editDialogueItemType == EditDialogueItemType.Comments ? commonStyle.editItemColor : "",
                                    color: dialogueItemEditState.isPhraseCommentsEdited ? commonStyle.editedItemColor : ""
                                }}
                                onClick={() => onEditDialogueItemType(EditDialogueItemType.Comments)}
                            >
                                <MessageIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    backgroundColor: editDialogueItemType == EditDialogueItemType.PhraseTenseses ? commonStyle.editItemColor : "",
                                    color: dialogueItemEditState.isPhraseTensesesEdited ? commonStyle.editedItemColor : ""
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
                                            ? commonStyle.editedItemColor
                                            : ""
                                    }}

                                    onClick={() => onSavePhrase()}
                                >
                                    <SaveIcon />
                                </IconButton>
                                : null
                            }


                        </Grid>
                    }

                    <ChatElement
                        title={``}
                        position={"left"}
                        type={"text"}
                        text={phraseRecoil.text}
                    />
                    <Box>
                        <Grid display='flex' direction='column' alignItems='end'>
                            {constructorActionsState.answer.isSave
                                ? <CircularProgress size={20} />
                                : <Grid
                                    display='flex' direction='row' alignItems='center'
                                >
                                    <IconButton
                                        sx={{
                                            backgroundColor: editDialogueItemType == EditDialogueItemType.Answers ? commonStyle.editItemColor : "",
                                            color: dialogueItemEditState.isAnswersEdited ? commonStyle.editedItemColor : ""
                                        }}
                                        onClick={() => onEditDialogueItemType(EditDialogueItemType.Answers)}
                                    >
                                        <DriveFileRenameOutlineIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            backgroundColor: editDialogueItemType == EditDialogueItemType.Translates ? commonStyle.editItemColor : "",
                                            color: dialogueItemEditState.isAnswersTranslatesEdited ? commonStyle.editedItemColor : ""
                                        }}
                                        onClick={() => onEditDialogueItemType(EditDialogueItemType.Translates)}>
                                        <TranslateIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            backgroundColor: editDialogueItemType == EditDialogueItemType.AnswersTenseses ? commonStyle.editItemColor : "",
                                            color: dialogueItemEditState.isAnswersTensesListEdited ? commonStyle.editedItemColor : ""
                                        }}
                                        onClick={() => onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                                        <AvTimerIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            backgroundColor: editDialogueItemType == EditDialogueItemType.PossibleWords ? commonStyle.editItemColor: "",
                                            color: dialogueItemEditState.isAnswersPossibleWordsEdited ? commonStyle.editedItemColor : ""
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
                                                    ? commonStyle.editedItemColor
                                                    : ""
                                            }}
                                            onClick={() => onSaveAnswer()}>

                                            <SaveIcon />

                                        </IconButton>
                                        : null
                                    }

                                </Grid>
                            }


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
                        id={phrase.answers.find(answer => answer?.id == dialogueLineSelection)?.id ?? ""}
                        parentId={phrase.id}
                        editDialogueItemType={editDialogueItemType}
                        onEditedDialogueItemType={onEditedDialogueItemType}
                        setStatus={setStatus}
                    />
                }

            </Box>

            <Divider variant="fullWidth" />

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
            {!phrase.audioSettings?.audioData && !!phraseRecoil.text
                ? <Alert severity="error">The phrase is not generated to audio!</Alert>
                : null
            }
        </Box>
    )
}

const commonStyle = {
    editedItemColor: "#ff9800",
    editItemColor: "#fafafa"
}