import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';
import IAnswerModel from '../ThereGame.Business/Models/IAnswerModel';
import IDialogueItemModel from '../ThereGame.Business/Models/IDialogueItemModel';
import { IDialogueModel } from '../ThereGame.Business/Models/IDialogueModel';
import IPhraseModel from '../ThereGame.Business/Models/IPhraseModel';

export type IUpdatePhraseItemInput = {
    readonly dialogueId?: string
    readonly itemId: string
    readonly item: IPhraseModel
}

export type IAddAnswerItemInput = {
    readonly dialogueId?: string
    readonly itemId: string
    readonly item: IAnswerModel
}

export type IPhraseAnswerItemInput = {
    readonly dialogueId?: string
    readonly itemId: string
}

export type IFindDialogueItemInput = {
    readonly dialogueId: string
    readonly itemId: string
}

const dialoguesAtom = atom<IDialogueModel[]>({
    key: 'dialoguesAtom',
    default: [],
})

const dialogueConstructorAtom = atom<Function>({
    key: 'dialogueConstructorAtom',
    default: () => {},
})


export function useDialogues() {
    return useRecoilState(dialoguesAtom)
}

export function useDialogueItemConstructor() {
    return useRecoilState(dialogueConstructorAtom);
}

export function useDialogue(id: string) {
    return useRecoilValue(dialogueSelectorFamily(id));
}

export function usePhrase(dialogueId: string, phraseId: string): IPhraseModel {
    const findDialogueItemInput: IFindDialogueItemInput = {
        dialogueId,
        itemId: phraseId,
    }
    return useRecoilValue(phraseSelectorFamily(findDialogueItemInput))
}

export function useAnswer(dialogueId: string, answerId: string): IAnswerModel {
    const findDialogueItemInput: IFindDialogueItemInput = {
        dialogueId,
        itemId: answerId,
    }
    return useRecoilValue(answerSelectorFamily(findDialogueItemInput))
}

const dialogueSelectorFamily = selectorFamily<IDialogueModel, string>({
    key: 'dialogueSelectorFamily',
    get: (dialogueId: string) => ({ get }) => {
        const dialogues = get(dialoguesAtom)
        return findDialogueById(dialogues, dialogueId) as IDialogueModel;
    },
    dangerouslyAllowMutability: true,
});

const phraseSelectorFamily = selectorFamily<IPhraseModel, IFindDialogueItemInput>({
    key: 'phraseSelectorFamily',
    get: (findDialogueItemInput: IFindDialogueItemInput) => ({ get }) => {
        const dialog = get(dialogueSelectorFamily(findDialogueItemInput.dialogueId))
        return findDialogueItemById(dialog, findDialogueItemInput.itemId) as IPhraseModel;
    },
    dangerouslyAllowMutability: true,
});

const answerSelectorFamily = selectorFamily<IAnswerModel, IFindDialogueItemInput>({
    key: 'answerSelectorFamily',
    get: (findDialogueItemInput: IFindDialogueItemInput) => ({ get }) => {
        const dialog = get(dialogueSelectorFamily(findDialogueItemInput.dialogueId));
        return findDialogueItemById(dialog, findDialogueItemInput.itemId) as IAnswerModel;
    },
    dangerouslyAllowMutability: true,
});


function findDialogueById(dialogues: IDialogueModel[], dialogueId: string): IDialogueModel | undefined {
    return dialogues?.find(dialogue => dialogue?.id == dialogueId);
}
function findDialogueItemById(dialogue: IDialogueModel, itemId: string): IDialogueItemModel | null {
    if (!dialogue?.phrase) {
        return null;
    }

    if (dialogue.phrase.id == itemId) {
        return dialogue.phrase
    }

    const foundDialogueItem = findAnswerById(dialogue.phrase.answers, itemId);
    return foundDialogueItem
}
function findAnswerById(answers: IAnswerModel[], targetId: string): IDialogueItemModel | null {
    for (const answer of answers) {
        if (answer.id === targetId) {
            return answer;
        }

        const foundInAnswers = findPhraseById(answer.phrases, targetId);
        if (foundInAnswers) {
            return foundInAnswers;
        }
    }

    return null;
}
function findPhraseById(phrases: IPhraseModel[], targetId: string): IDialogueItemModel | null {
    for (const phrase of phrases) {
        if (phrase.id === targetId) {
            return phrase;
        }

        const foundInAnswers = findAnswerById(phrase.answers, targetId);
        if (foundInAnswers) {
            return foundInAnswers;
        }
    }

    return null;
}