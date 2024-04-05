import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LanguageType } from "../../Data/LanguageType";
import { useAnswer, useDialogue } from "../../Data/useDialogues";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import ITranslateModel from "../../ThereGame.Business/Models/ITranslateModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import ChatGptService from "../../ThereGame.Infrastructure/Services/ChatGpt/ChatGptService";
import IChatGPTResponseDto, { IDataResponse } from "../../ThereGame.Infrastructure/Services/ChatGpt/Dtos/IChatGptResponseDto";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import PossibleWordsToUseInfo from "./PossibleWordsToUse/PossibleWordsToUseInfo";
import TensesListConstructor from "./TensesList/TensesListConstructor";
import TranslatesInfo from "./Translates/TranslatesInfo";
import { EditDialogueItemType } from '../models/EditType';
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import { useDialogueItemState } from "../../Data/useDialogueitemState";
import DialogueLineAnswersConstructor from "./Constructor/DialogueLineAnswersConstructor";
import ModalConstructor from "../ModalContructor";
import useVocabularyBlockQueriesApi from "../../ThereGame.Api/Queries/VocabularyBlockQueriesApi";
import { useVocabularyBlockState } from "../../Data/useVocabularyBlocks";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    parentId: string,
    editDialogueItemType: EditDialogueItemType | undefined
    currentPhraseText: string;
    
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType | undefined) => void;
    onEditedDialogueItemType: (editDialogueItemType: EditDialogueItemType, isEdited: boolean) => void;
    setStatus: (status: Status) => void
}

export default function DialogueLineContructor(props: IAnswerContructor): JSX.Element | null {
    const [constructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();
    const dialogueRecoil = useDialogue(props.dialogueId);
    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const answerQueriesApi = useAnswerQueriesApi();

    const [sessionDialogueLine, setSessionAnswerData] = useState<IAnswerModel>(answerRecoil);

    const [isEdited, setIsEdited] = useState(true);
    const [isChatGptLoading, setIsChatGptLoading] = useState<boolean>(false);
    const [dialogueItemState, setDialogueItemState] = useDialogueItemState();
    const actions = useConstructorActions();

    const [isDialogueLineInstructionOpen, setIsDialogueLineInstructionOpen] = useState<boolean>(false);
    const [isSaveInstructionOpen, setIsSaveInstructionOpen] = useState<boolean>(false);
   
    const onPossibleWordsChange = (wordsToUse: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            wordsToUse: wordsToUse
        }));

        setIsEdited(false);
    }

    // Translate
    const onAddTranslate = () => {
        var translate: ITranslateModel = {
            parentId: props.id,
            id: uuidv4(),
            language: LanguageType.Russian,
            text: ""
        }

        setSessionAnswerData(prev => ({
            ...prev,
            translates: [...sessionDialogueLine.translates, translate]
        }));

        setIsEdited(false);
    }

    const onDeleteTranslate = (id: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            translates: [...sessionDialogueLine.translates]
                .filter(translate => translate.id != id)
        }));

        setIsEdited(false);
    }

    const onTranslateChange = (translates: ITranslateModel[]) => {
        setSessionAnswerData(prev => ({
            ...prev,
            translates: translates
        }));

        setIsEdited(false);
    }

    const onSetTenses = (tensesList: string[]) => {
        setSessionAnswerData(prev => ({
            ...prev,
            tensesList
        }));

        setIsEdited(false)
    }

    const ChatGpt = async (sentence: string) => {
        if (!sentence) {
            return;
        }

        setIsChatGptLoading(true);
        var result = await new ChatGptService().request(sentence);

        var chatGPTResponse: IChatGPTResponseDto = result?.data;

        chatGPTResponse.choices.map(choice => {
            var data: IDataResponse = JSON.parse(choice.message.content);

            data.variations.map(variation => {
                onAddEquivalentAnswer(variation);
            })
            var translates = data.translations.map(translate => {
                return {
                    parentId: sessionDialogueLine.id,
                    id: uuidv4(),
                    language: LanguageType.Russian,
                    text: translate
                }
            });

            onTranslateChange(translates);
            onPossibleWordsChange(data.words_uppercase);
            onSetTenses(data.tenseses);
        });

        setIsChatGptLoading(false);
    }

    const reset = () => {
        setSessionAnswerData(answerRecoil);
        setIsEdited(true);

        localStorage.removeItem(props.id);
        constructorActions.setIsReset(false);
    }

    // QueriesApi

    const onSave = async () => {
        setIsSaveInstructionOpen(true);
        actions.setIsScenarioUpdated(true);
        var status = await answerQueriesApi.update(sessionDialogueLine);
        if (status == Status.OK) {
            localStorage.removeItem(props.id)
            constructorActions.setIsSaveAnswer(false);
        }
        setIsSaveInstructionOpen(false);
        setIsEdited(true);
        actions.setIsScenarioUpdated(true);
    }

    const onDialogueLineAnswerChange = (value: string, index: number) => {
        var texts = [...sessionDialogueLine.texts];
        texts[index] = value;

        setSessionAnswerData(prev => ({
            ...prev,
            texts: texts
        }))

        setIsEdited(false);
    }
    const onAddEquivalentAnswer = (value: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            texts: [...prev.texts, value]
        }))

        setIsEdited(false);
    }

    const onRemoveEquivalentAnswer = (value: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            texts: prev.texts.filter(text => text != value)
        }));

        setIsEdited(false);
    }

    // Components
    function TensesListComponent() {
        return (
            <TensesListConstructor
                tensesList={sessionDialogueLine.tensesList}
                setTensesList={onSetTenses}
            />
        )
    }

    function DialogueLineAnswersComponent() {
        return (
            <DialogueLineAnswersConstructor
                onDialogueLineAnswerChange={onDialogueLineAnswerChange}
                onAddEquivalentAnswer={onAddEquivalentAnswer}
                onRemoveEquivalentAnswer={onRemoveEquivalentAnswer}
                texts={sessionDialogueLine.texts}
                chatGpt={ChatGpt}
                isLoading={isChatGptLoading}
            />
        )
    }

    function PossibleWordsComponent() {
        return (
            <PossibleWordsToUseInfo
                wordsToUse={sessionDialogueLine.wordsToUse}
                onWordsToUseChange={onPossibleWordsChange}
            />
        )
    }

    function TranslatesComponent() {
        return (
            <TranslatesInfo
                translates={sessionDialogueLine.translates}
                onAddTranslate={onAddTranslate}
                onDeleteTranslate={onDeleteTranslate}
                onTranslateChange={onTranslateChange}
            />
        )
    }

    // UseEffects
    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setSessionAnswerData(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setSessionAnswerData(JSON.parse(data));
    }, [answerRecoil]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setSessionAnswerData(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setSessionAnswerData(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (constructorActionsState.answer.isSave) {
            onSave();
        }
        if (constructorActionsState.answer.isReset) {
            reset();
        }


    }, [constructorActionsState.answer]);

    useEffect(() => {
        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(sessionDialogueLine));
    }, [sessionDialogueLine]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (JSON.stringify(answerRecoil) !== data) {
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [sessionDialogueLine]);

    useEffect(() => {
        if (isEdited) {
            setDialogueItemState(DialogueItemStateType.NoErrors)
            return;
        }

        setDialogueItemState(DialogueItemStateType.UnsavedChanges)
    }, [isEdited]);

    useEffect(() => {
        if (!answerRecoil) {
            return;
        }
        var isOpen = !answerRecoil.texts.length;
        setIsDialogueLineInstructionOpen(isOpen);
    }, [answerRecoil]);

    const confirm = () => {
        if (JSON.stringify(answerRecoil.texts) != JSON.stringify(sessionDialogueLine.texts)) {
            onSave();
        }

        props.onEditDialogueItemType(props.editDialogueItemType);
        setIsDialogueLineInstructionOpen(false);
    }

    if (!sessionDialogueLine) {
        return null;
    }

    if (isDialogueLineInstructionOpen) {
        return (
            <ModalConstructor
                element={DialogueLineAnswersComponent()}
                onClose={confirm}
                isOpen={isDialogueLineInstructionOpen}
                editDialogueItemType={props.editDialogueItemType}
                description={`Alright! ${!props.currentPhraseText ? `It looks like i say nothing first` : `My phrase is <${props.currentPhraseText}>`} .What a student can to ${!props.currentPhraseText ? 'say' :  `answer`} me on the storyline? Please add it to list`}
            />
        )
    }

   
    if (isSaveInstructionOpen) {
        return (
            <ModalConstructor
                element={<div></div>}
                onClose={() => setIsSaveInstructionOpen(false)}
                isOpen={isSaveInstructionOpen}
                editDialogueItemType={props.editDialogueItemType}
                description="Great! I need to write this down in my notes"
            />
        )
    }
    
    return (
        <Box>
            {/* <MistakeExplanationConstructor    // Don't remove
                explanations={answer.mistakeExplanations}
                onDeleteMistakeExplanation={onDeleteMistakeExplanation}
                onExplanationChange={onExplanationChange}
                onAddMistakeExplanation={onAddMistakeExplanation}
            /> */}

            <ModalConstructor
                element={DialogueLineAnswersComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.Answers}
                editDialogueItemType={props.editDialogueItemType}
                description={`Alright! ${!props.currentPhraseText ? `So, i say nothing` : `My phrase is <${props.currentPhraseText}>`} .What a student can to ${!props.currentPhraseText ? 'say' :  `answer`} me on the storyline? Please add it to list`}
            />
            <ModalConstructor
                element={TensesListComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.AnswersTenseses}
                editDialogueItemType={props.editDialogueItemType}
                description=" The student wondered what tense of sentence he could use to answer?
                Give him a hint here!"

            />
            <ModalConstructor
                element={TranslatesComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.Translates}
                editDialogueItemType={props.editDialogueItemType}
                description="I have an idea! What if you let a student make a translation to answer me? Just create a list."

            />
            <ModalConstructor
                element={PossibleWordsComponent()}
                onClose={confirm}
                isOpen={props.editDialogueItemType == EditDialogueItemType.PossibleWords}
                editDialogueItemType={props.editDialogueItemType}
                description="You can write here words that a student can use to answer!"
            />
        </Box>
    )
}

