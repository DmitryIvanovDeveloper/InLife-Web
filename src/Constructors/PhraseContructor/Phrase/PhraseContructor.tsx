import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { usePhrase, useDialogue } from "../../../Data/useDialogues";
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
import { useDialogueItemState } from "../../../Data/useDialogueitemState";
import ModalConstructor from "../../ModalContructor";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
    parentId: string;
    editDialogueItemType: EditDialogueItemType | undefined;
    onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType | undefined) => void;
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditedDialogueItemType: (editDialogueItemType: EditDialogueItemType, isEdited: boolean) => void;
    setStatus: (status: Status) => void
}

export default function PhraseContructor(props: IPhraseConstructor): JSX.Element | null {
    const [constructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();
    const phraseQueriesApi = usePhraseQueriesApi();
    const phraseRecoil = usePhrase(props.dialogueId, props.id);
    const dialogueRecoil = useDialogue(props.dialogueId);
    const [sessionPhraseData, setSessionPhraseData] = useState<IPhraseModel>(phraseRecoil);
    const [isEdited, setIsEdited] = useState(true);
    const [dialogueItemState, setDialogueItemState] = useDialogueItemState();
    const actions = useConstructorActions();
    const [isPhraseInstructionOpen, setIsPhraseInstructionOpen] = useState<boolean>(false);
    const [isSaveInstructionOpen, setIsGenerationPhraseOpen] = useState<boolean>(false);
    // QueryApi
    const onSave = async () => {
        const updatedsessionPhraseData = JSON.parse(JSON.stringify(sessionPhraseData));

        updatedsessionPhraseData.audioSettings = getSettings();
        setIsGenerationPhraseOpen(true);

        var status = await phraseQueriesApi.update(updatedsessionPhraseData);
        props.setStatus(status);
        if (status == Status.OK) {
            localStorage.removeItem(props.id);
            constructorActions.setIsSavePhrase(false);
        }
        setIsEdited(true);

        actions.setIsScenarioUpdated(true);
    }


    const reset = () => {
        setSessionPhraseData(phraseRecoil);
        setIsEdited(true);
        localStorage.removeItem(props.id);
        constructorActions.setIsReset(false);
    }

    const onChangeText = (phrase: string) => {
        setSessionPhraseData(prev => ({
            ...prev,
            text: phrase
        }));


        setIsEdited(false);
    }

    const onCommentsChange = (comments: string) => {
        setSessionPhraseData(prev => ({
            ...prev,
            comments
        }));
        setIsEdited(false);
    }

    const onSetTenses = (tenses: string[]) => {
        setSessionPhraseData(prev => ({
            ...prev,
            tensesList: tenses
        }));

        setIsEdited(false);
    }

    // Components
    function PhraseComponent() {
        return (
            <PhraseInfo
                phrase={sessionPhraseData?.text}
                onChangeText={onChangeText}
            />
        )
    }

    function PhraseTensesListComponent() {
        return (
            <TensesListInfo
                tensesList={sessionPhraseData.tensesList}
                setTensesList={onSetTenses}
            />
        )
    }

    function CommentsComponent() {
        return (
            <CommentsInfo
                comments={sessionPhraseData.comments}
                onCommentsChange={onCommentsChange}
            />
        )
    }

    useEffect(() => {
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(sessionPhraseData));
    }, [sessionPhraseData]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setSessionPhraseData(phraseRecoil);
            setIsEdited(true);
            return;
        }

        setIsEdited(false);

        setSessionPhraseData(JSON.parse(data));
    }, [phraseRecoil])

    const onLastInstructionDone = () => {
        if (sessionPhraseData.text != phraseRecoil.text) {
            onSave();
        }
         setIsPhraseInstructionOpen(false);
        props.onEditDialogueItemType(undefined);
    }

    const confirm = () => {
        props.onEditDialogueItemType(undefined);
        // onSave();
    }
    // UseEffects

    const getSettings = () => {
        var parsedData = JSON.parse(dialogueRecoil.voiceSettings);

        var newAudioSettings: IAudioSettings = {
            id: uuidv4(),
            generationSettings: GetSettings(parsedData.type, parsedData.name, sessionPhraseData?.text)
        }

        return newAudioSettings;
    }

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setSessionPhraseData(phraseRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setSessionPhraseData(JSON.parse(data));
    }, [phraseRecoil])

    useEffect(() => {
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(sessionPhraseData));

    }, [sessionPhraseData]);

    // useEffect(() => {
    //     props.onEditedDialogueItemType(EditDialogueItemType.Phrase, sessionPhraseData?.text != phraseRecoil?.text);
    //     props.onEditedDialogueItemType(EditDialogueItemType.Comments, sessionPhraseData?.comments != phraseRecoil?.comments);
    //     props.onEditedDialogueItemType(EditDialogueItemType.PhraseTenseses, JSON.stringify(sessionPhraseData?.tensesList) != JSON.stringify(phraseRecoil?.tensesList));
    // }, [sessionPhraseData?.tensesList, sessionPhraseData?.comments, sessionPhraseData?.text]);

    useEffect(() => {
        if (isEdited) {
            setDialogueItemState(DialogueItemStateType.NoErrors)
            return;
        }

        setDialogueItemState(DialogueItemStateType.UnsavedChanges)
    }, [isEdited]);


    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (JSON.stringify(phraseRecoil) !== data) {
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [sessionPhraseData]);

    useEffect(() => {
        if (constructorActionsState.phrase.isSave) {
            onSave();
        }
        if (constructorActionsState.phrase.isReset) {
            reset();
        }
    }, [constructorActionsState.phrase]);

    useEffect(() => {
        if (!phraseRecoil) {
            return;
        }

        var isOpen = !phraseRecoil.text &&
            !phraseRecoil.answers.length &&
            !!dialogueRecoil.voiceSettings &&
            !!dialogueRecoil.name &&
            !!constructorActionsState.selectedNpc.scenarioId
        ;

        setIsPhraseInstructionOpen(isOpen);
    }, [phraseRecoil]);

    useEffect(() => {
        if (!props.editDialogueItemType) {
            return;
        }

        setIsPhraseInstructionOpen(false);
    }, [props.editDialogueItemType]);

    if (!sessionPhraseData) {
        return null;
    }

    if (isPhraseInstructionOpen) {
        return (
            <ModalConstructor
                element={PhraseComponent()}
                isOpen={isPhraseInstructionOpen}
                editDialogueItemType={EditDialogueItemType.Phrase}
                onClose={() => onLastInstructionDone()}
                description='What i should to say?'
            />
        )
    }

    if (isSaveInstructionOpen) {
       return <ModalConstructor
            element={<div></div>}
            isOpen={isSaveInstructionOpen}
            editDialogueItemType={EditDialogueItemType.Phrase}
            onClose={() => setIsGenerationPhraseOpen(false)}
            description='Got it! I need some time to rehearse it. Please wait...'
        />
    }

    return (
        <Box>
            <ModalConstructor
                element={PhraseComponent()}
                onClose={() => onLastInstructionDone()}
                isOpen={props.editDialogueItemType == EditDialogueItemType.Phrase}
                editDialogueItemType={props.editDialogueItemType}
                description="What i should to say?"
            />
            <ModalConstructor
                element={PhraseTensesListComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.PhraseTenseses}
                editDialogueItemType={props.editDialogueItemType}
            />
            <ModalConstructor
                element={CommentsComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.Comments}
                editDialogueItemType={props.editDialogueItemType}
            />
        </Box>
    )
}