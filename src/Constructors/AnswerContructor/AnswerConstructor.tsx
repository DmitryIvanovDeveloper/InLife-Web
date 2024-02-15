import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LanguageType } from "../../Data/LanguageType";
import { useAnswer, useDialogueItemConstructor } from "../../Data/useDialogues";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
import ITranslateModel from "../../ThereGame.Business/Models/ITranslateModel";
import { DialogueItemStateType } from "../../ThereGame.Business/Util/DialogueItemStateType";
import ChatGptService from "../../ThereGame.Infrastructure/Services/ChatGpt/ChatGptService";
import IChatGPTResponseDto, { IDataResponse } from "../../ThereGame.Infrastructure/Services/ChatGpt/Dtos/IChatGptResponseDto";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import EquivalentAnswersInfo from "./Answer/AnswersInfo";
import PossibleWordsToUseInfo from "./PossibleWordsToUse/PossibleWordsToUseInfo";
import TensesListInfo from "./TensesList/TensesListInfo";
import TranslatesInfo from "./Translates/TranslatesInfo";
import { EditDialogueItemType } from '../models/EditType';
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
    parentId: string,
    editDialogueItemType: EditDialogueItemType | undefined;
    setStates?: (states: DialogueItemStateType[]) => void;
    onEditedDialogueItemType: (editDialogueItemType: EditDialogueItemType, isEdited: boolean) => void;
    setStatus: (status: Status) => void

}



export default function AnswerContructor(props: IAnswerContructor): JSX.Element | null {
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();

    const answerRecoil = useAnswer(props.dialogueId, props.id);

    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();

    const [answer, setAnswer] = useState<IAnswerModel>(answerRecoil);

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [isEdited, setIsEdited] = useState(true);
    const [isChatGptLoading, setIsChatGptLoading] = useState<boolean>(false);
    const [tab, setTab] = useState<string>("1");

    const onAddPhraseButtonClick = async () => {
        var status = await phraseQueriesApi.create(props.id);
        props.setStatus(status);

    }
    const onChangeText = (event: any) => {
        setAnswer(prev => ({
            ...prev,
            text: event.target.value
        }));

        setIsEdited(false);
    }

    const onWordsToUseChange = (wordsToUse: string) => {
        setAnswer(prev => ({
            ...prev,
            wordsToUse: wordsToUse
        }));

        setIsEdited(false);
    }
    // Mistake Explanation
    const onExplanationChange = (event: any, index: number) => {
        var explanation = [...answer.mistakeExplanations];

        if (event.target.id == 'word') {
            explanation[index].word = event.target.value;
        }
        if (event.target.id == 'mistake explanation') {
            explanation[index].explanation = event.target.value;
        }

        setAnswer(prev => ({
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

        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: [
                ...prev.mistakeExplanations,
                mistakeExplanation
            ]
        }));

        setIsEdited(false);
    }

    const onDeleteMistakeExplanation = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            mistakeExplanations: [...answer.mistakeExplanations]
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

        setAnswer(prev => ({
            ...prev,
            translates: [...answer.translates, translate]
        }));

        setIsEdited(false);
    }

    const onDeleteTranslate = (id: string) => {
        setAnswer(prev => ({
            ...prev,
            translates: [...answer.translates]
                .filter(translate => translate.id != id)
        }));

        setIsEdited(false);
    }

    const onTranslateChange = (translates: ITranslateModel[]) => {
        setAnswer(prev => ({
            ...prev,
            translates: translates
        }));

        setIsEdited(false);
    }

    const onSetTenses = (tenses: string[]) => {
        setAnswer(prev => ({
            ...prev,
            tensesList: tenses
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
                    parentId: answer.id,
                    id: uuidv4(),
                    language: LanguageType.Russian,
                    text: translate
                }
            });

            onTranslateChange(translates);
            onWordsToUseChange(data.words_uppercase);
            onSetTenses(data.tenseses);
        });
        setIsChatGptLoading(false);

    }

    const reset = () => {
        setAnswer(answerRecoil);
        setIsEdited(true);

        localStorage.removeItem(props.id);
    }

    // QueriesApi


    const onSave = async () => {
        var status = await answerQueriesApi.update(answer);
        if (status == Status.OK) {
            localStorage.removeItem(props.id)
            constructorActions.setIsSaveAnswer(false);
        }
        
        setIsEdited(true);
    }

    const onChangeEquivalentAnswer = (value: string, index: number) => {
        var texts = [...answer.texts];
        texts[index] = value;

        setAnswer(prev => ({
            ...prev,
            texts: texts
        }))

        setIsEdited(false);
    }
    const onAddEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: [...prev.texts, value]
        }))

        setIsEdited(false);
    }

    const onRemoveEquivalentAnswer = (value: string) => {
        setAnswer(prev => ({
            ...prev,
            texts: prev.texts.filter(text => text != value)
        }));

        setIsEdited(false);
    }

    // Components
    function TensesListComponent() {
        return (
            <TensesListInfo
                tensesList={answer.tensesList}
                setTensesList={onSetTenses}
            />
        )
    }

    function EquivalentAnswersComponent() {
        return (
            <EquivalentAnswersInfo
                onChangeEquivalentAnswer={onChangeEquivalentAnswer}
                onAddEquivalentAnswer={onAddEquivalentAnswer}
                onRemoveEquivalentAnswer={onRemoveEquivalentAnswer}
                texts={answer.texts}
                chatGpt={ChatGpt}
                isLoading={isChatGptLoading}
            />
        )
    }

    function PossibleWordsComponent() {
        return (
            <PossibleWordsToUseInfo
                wordsToUse={answer.wordsToUse}
                onWordsToUseChange={onWordsToUseChange}
            />
        )
    }

    function TranslatesComponent() {
        return (
            <TranslatesInfo
                translates={answer.translates}
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
            setAnswer(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setAnswer(JSON.parse(data));
    }, [answerRecoil]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (!data) {
            setAnswer(answerRecoil);
            setIsEdited(true);
            return;
        }
        setIsEdited(false);

        setAnswer(JSON.parse(data));
    }, []);
    
    useEffect(() => {
        if (!constructorActionsState.answer.isSave) {
            return;
        }

        onSave();

    }, [constructorActionsState.answer.isSave]);

    useEffect(() => {

        if (isEdited) {
            return;
        }

        localStorage.setItem(props.id, JSON.stringify(answer));
    }, [answer]);

    useEffect(() => {
        var data = localStorage.getItem(props.id);
        if (JSON.stringify(answerRecoil) !== data) {
            return;
        }

        localStorage.removeItem(props.id);
        setIsEdited(true)
    }, [answer]);

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
        props.onEditedDialogueItemType(EditDialogueItemType.Answers, JSON.stringify(answer?.texts) != JSON.stringify(answerRecoil?.texts));
        props.onEditedDialogueItemType(EditDialogueItemType.Translates, JSON.stringify(answer?.translates) != JSON.stringify(answer?.translates));
        props.onEditedDialogueItemType(EditDialogueItemType.PhraseTenseses, JSON.stringify(answer?.tensesList) != JSON.stringify(answer?.tensesList));
        props.onEditedDialogueItemType(EditDialogueItemType.PossibleWords, answer?.wordsToUse != answer?.wordsToUse);
    }, [answer]);

    if (!answer) {
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
                ? EquivalentAnswersComponent()
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

