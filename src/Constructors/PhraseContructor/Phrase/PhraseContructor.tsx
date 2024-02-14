import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import AppBarDeleteButton from "../../../Components/AppBarDeleteButton";
import { useDialogueItemConstructor, usePhrase, useDialogue } from "../../../Data/useDialogues";
import useAnswerQueriesApi from "../../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAudioSettings from "../../../ThereGame.Business/Models/IAudioSettings";
import IPhraseModel from "../../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemStateType } from "../../../ThereGame.Business/Util/DialogueItemStateType";
import GetSettings from "../../../ThereGame.Infrastructure/Helpers/PhraseAudioGegerationSettingsBuilder";
import { Status } from "../../../ThereGame.Infrastructure/Statuses/Status";
import AnswerContructor from "../../AnswerContructor/AnswerConstructor";
import CommentsInfo from "../Comments/CommentsInfo";
import TensesListInfo from "../TensesList/TensesListInfo";
import PhraseInfo from "./PhraseInfo";
import { EditDialogueItemType } from "../../models/EditType";
import { v4 as uuidv4 } from 'uuid';

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string;
    editDialogueItemType: EditDialogueItemType | undefined;
    setStates?: (states: DialogueItemStateType[]) => void;
}

export default function PhraseContructor(props: IPhraseConstructor): JSX.Element | null {
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const phraseQueriesApi = usePhraseQueriesApi();
    const answerQueriesApi = useAnswerQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const dialogueRecoil = useDialogue(props.dialogueId);


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

    // Components
    function PhraseComponent() {
        return (
            <PhraseInfo
                phrase={phrase.text}
                onChangeText={onChangeText}
            />
        )
    }

    function PhraseTensesListComponent() {
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
            {props.editDialogueItemType == EditDialogueItemType.Phrase
                ? PhraseComponent()
                : null
            }
            {props.editDialogueItemType == EditDialogueItemType.PhraseTenseses
                ? PhraseTensesListComponent()
                : null
            }
             {props.editDialogueItemType == EditDialogueItemType.Comments
                ? CommentsComponent()
                : null
            }

        
        </Box>
    )
}