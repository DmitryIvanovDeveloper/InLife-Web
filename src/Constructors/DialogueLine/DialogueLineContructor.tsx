import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LanguageType } from "../../Data/LanguageType";
import { useAnswer } from "../../Data/useDialogues";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
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

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    parentId: string,
    editDialogueItemType: EditDialogueItemType | undefined;
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditedDialogueItemType: (editDialogueItemType: EditDialogueItemType, isEdited: boolean) => void;
    setStatus: (status: Status) => void
}



export default function DialogueLineContructor(props: IAnswerContructor): JSX.Element | null {
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();

    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();

    const [sessionDialogueLine, setSessionAnswerData] = useState<IAnswerModel>(answerRecoil);

    const [isEdited, setIsEdited] = useState(true);
    const [isChatGptLoading, setIsChatGptLoading] = useState<boolean>(false);
    const [dialogueItemState, setDialogueItemState] = useDialogueItemState();

    const onAddPhraseButtonClick = async () => {
        var status = await phraseQueriesApi.create(props.id);
        props.setStatus(status);

    }
    const onChangeText = (event: any) => {
        setSessionAnswerData(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsEdited(false);
    }

    const onPossibleWordsChange = (wordsToUse: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            wordsToUse: wordsToUse
        }));

        setIsEdited(false);
    }
    // Mistake Explanation
    const onExplanationChange = (event: any, index: number) => {
        var explanation = [...sessionDialogueLine.mistakeExplanations];

        if (event.target.id == 'word') {
            explanation[index].word = event.target.value;
        }
        if (event.target.id == 'mistake explanation') {
            explanation[index].explanation = event.target.value;
        }

        setSessionAnswerData(prev => ({
            ...prev,
            mistakeExplanations: explanation
        }));
    }

    const onAddMistakeExplanation = () => {
        const mistakeExplanation: IMistakeExplanationModel = {
            parentId: props.id,
            word: "",
            explanation: "",
            id: uuidv4()
        }

        setSessionAnswerData(prev => ({
            ...prev,
            mistakeExplanations: [
                ...prev.mistakeExplanations,
                mistakeExplanation
            ]
        }));

        setIsEdited(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        setSessionAnswerData(prev => ({
            ...prev,
            mistakeExplanations: [...sessionDialogueLine.mistakeExplanations]
                .filter(explanation => explanation.id != id)
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

        console.log("ds");
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
        var status = await answerQueriesApi.update(sessionDialogueLine);
        if (status == Status.OK) {
            localStorage.removeItem(props.id)
            constructorActions.setIsSaveAnswer(false);
        }
        
        setIsEdited(true);
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
        props.onEditedDialogueItemType(EditDialogueItemType.Answers, JSON.stringify(sessionDialogueLine?.texts) != JSON.stringify(answerRecoil?.texts));
        props.onEditedDialogueItemType(EditDialogueItemType.Translates, JSON.stringify(sessionDialogueLine?.translates) != JSON.stringify(answerRecoil?.translates));
        props.onEditedDialogueItemType(EditDialogueItemType.AnswersTenseses, JSON.stringify(sessionDialogueLine?.tensesList) != JSON.stringify(answerRecoil?.tensesList));
        props.onEditedDialogueItemType(EditDialogueItemType.PossibleWords, sessionDialogueLine?.wordsToUse != answerRecoil?.wordsToUse);
    }, [sessionDialogueLine]);

    if (!sessionDialogueLine) {
        return null;
    }

    return (
        <Box>
            {/* <MistakeExplanationConstructor    // Don't remove
                explanations={answer.mistakeExplanations}
                onDeleteMistakeExplanation={onDeleteMistakeExplanation}
                onExplanationChange={onExplanationChange}
                onAddMistakeExplanation={onAddMistakeExplanation}
            /> */}

            {props.editDialogueItemType == EditDialogueItemType.Answers
                ? DialogueLineAnswersComponent()
                : null
            }
            {props.editDialogueItemType == EditDialogueItemType.AnswersTenseses
                ? TensesListComponent()
                : null
            }
            {props.editDialogueItemType == EditDialogueItemType.Translates
                ? TranslatesComponent()
                : null
            }
            {props.editDialogueItemType == EditDialogueItemType.PossibleWords
                ? PossibleWordsComponent()
                : null
            }
        </Box>
    )
}

