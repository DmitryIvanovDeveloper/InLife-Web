import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import {  usePhrase, useDialogue } from "../../../Data/useDialogues";
import usePhraseQueriesApi from "../../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAudioSettings from "../../../ThereGame.Business/Models/IAudioSettings";
import IPhraseModel from "../../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemStateType } from "../../../ThereGame.Business/Util/DialogueItemStateType";
import GetSettings from "../../../ThereGame.Infrastructure/Helpers/PhraseAudioGegerationSettingsBuilder";
import { Status } from "../../../ThereGame.Infrastructure/Statuses/Status";
import CommentsInfo from "../Comments/CommentsInfo";
import TensesListInfo from "../TensesList/TensesListInfo";
import PhraseInfo from "./PhraseInfo";
import { EditDialogueItemType } from "../../models/EditType";
import { v4 as uuidv4 } from 'uuid';
import { useConstructorActionsState } from "../../../Data/useConstructorActionsState";
import useConstructorActions from "../../../Data/ConstructorActions";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string;
    editDialogueItemType: EditDialogueItemType | undefined;
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditedDialogueItemType: (editDialogueItemType: EditDialogueItemType, isEdited: boolean) => void;
    setStatus: (status: Status) => void
}

export default function PhraseContructor(props: IPhraseConstructor): JSX.Element | null {
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();
    
    const phraseQueriesApi = usePhraseQueriesApi();

    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const dialogueRecoil = useDialogue(props.dialogueId);

    const [phrase, setPhrase] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);


   
    // QueryApi
    const onSave = async () => {
        const updatedPhrase = JSON.parse(JSON.stringify(phrase));

        updatedPhrase.audioSettings = getSettings();

        var status = await phraseQueriesApi.update(updatedPhrase);
        props.setStatus(status);
        console.log(status);

        if (status == Status.OK) {
            localStorage.removeItem(props.id);
            constructorActions.setIsSavePhrase(false);
        }
        setIsEdited(true);
    }


    const reset = () => {
        setPhrase(phraseRecoil);
        setIsEdited(true);
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
        props.onEditedDialogueItemType(EditDialogueItemType.Phrase, phrase.text != phraseRecoil.text);
        props.onEditedDialogueItemType(EditDialogueItemType.Comments, phrase.comments != phraseRecoil.comments);
        props.onEditedDialogueItemType(EditDialogueItemType.PhraseTenseses, JSON.stringify(phrase.tensesList) != JSON.stringify(phraseRecoil.tensesList));

    }, [phrase.tensesList, phrase.comments, phrase.text]);

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

    useEffect(() => {
        if (!constructorActionsState.phrase.isSave) {
            return;
        }
        
        onSave();
       
    }, [constructorActionsState.phrase.isSave]);

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