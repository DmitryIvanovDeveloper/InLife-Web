import { dialoguesTemplate } from './DialogueData.ts';
import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil'
import { IDialogueModel } from '../ThreGame.Business/Models/IDialogueModel.ts'
import IPhraseModel from '../ThreGame.Business/Models/IPhraseModel.ts'
import IAnswerModel from '../ThreGame.Business/Models/IAnswerModel.ts'

export function useDialogues() {
    return useRecoilState(dialoguesAtom)
}

export function useDialogueItemConstructor() {
    return useRecoilState(dialogueConstructorAtom);
}

export function useDialogue(id: string) {
    return useRecoilValue(dialogueSelectorFamily(id));
}

const dialoguesAtom = atom<IDialogueModel[]>({
    key: 'dialoguesAtom',
    default: dialoguesTemplate,
})

const dialogueConstructorAtom = atom<Function>({
    key: 'dialogueConstructorAtom',
    default: () => { },
})


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


export function usePhraseCrud(dialogueId: string, id: string) {
    var [dialogues, setDialogues] = useRecoilState(dialoguesAtom);

    return {
        add: (item: IPhraseModel) => {
            var updatedDialogue = JSON.parse(JSON.stringify(dialogues));

            var dialogue = findDialogueById(updatedDialogue, dialogueId);
            if (!dialogue) {
                return;
            }

            const addDialogueItemInput: IUpdatePhraseItemInput = {
                dialogueId: dialogue?.id,
                itemId: id,
                item: item
            };

            var isAdded = AddPhrase(dialogue, addDialogueItemInput);
            if (!isAdded) {
                return;
            }

            setDialogues(updatedDialogue);
        },
    };
}

export function useAnswerCrud(dialogueId: string, id: string) {
    var [dialogues, setDialogues] = useRecoilState(dialoguesAtom);

    return {
        add: (item: IAnswerModel) => {
            var updatedDialogue = JSON.parse(JSON.stringify(dialogues))

            var dialogue = findDialogueById(updatedDialogue, dialogueId);
            if (!dialogue) {
                return;
            }

            const addDialogueItemInput: IAddAnswerItemInput = {
                dialogueId: dialogue?.id,
                itemId: id,
                item: item
            };

            var isAdded = AddAnswer(dialogue, addDialogueItemInput);
            if (!isAdded) {
                return;
            }

            setDialogues(updatedDialogue);
        },

    }
}


export type IFindDialogueItemInput = {
    readonly dialogueId: string
    readonly itemId: string
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
        return findDialogueItemById(dialog, findDialogueItemInput.itemId);
    },
    dangerouslyAllowMutability: true,
});

const answerSelectorFamily = selectorFamily<IAnswerModel, IFindDialogueItemInput>({
    key: 'answerSelectorFamily',
    get: (findDialogueItemInput: IFindDialogueItemInput) => ({ get }) => {
        const dialog = get(dialogueSelectorFamily(findDialogueItemInput.dialogueId));
        var expectedItem = findDialogueItemById(dialog, findDialogueItemInput.itemId);
        return findDialogueItemById(dialog, findDialogueItemInput.itemId) as IAnswerModel;
    },
    dangerouslyAllowMutability: true,
});

function AddPhrase(dialogue: IDialogueModel, addDialogueItemInput: IUpdatePhraseItemInput): boolean {
    if (!dialogue ||
        !addDialogueItemInput.dialogueId ||
        !addDialogueItemInput.itemId ||
        !addDialogueItemInput.item
    ) {
        return false;
    }

    var answer: IAnswerModel = findDialogueItemById(dialogue, addDialogueItemInput.itemId);
    if (!answer) {
        return false
    }

    answer.phrases.push(addDialogueItemInput.item);
    return true;
}

function AddAnswer(dialogue: IDialogueModel, addDialogueItemInput: IAddAnswerItemInput): boolean {
    if (!dialogue ||
        !addDialogueItemInput.dialogueId ||
        !addDialogueItemInput.itemId ||
        !addDialogueItemInput.item
    ) {
        return false;
    }

    var phrase: IPhraseModel = findDialogueItemById(dialogue, addDialogueItemInput.itemId);
    if (!phrase) {
        return false
    }

    phrase.answers.push(addDialogueItemInput.item);
    return true;
}
function findDialogueById(dialogues: IDialogueModel[], dialogueId: string): IDialogueModel | undefined {
    return dialogues?.find(dialogue => dialogue.id == dialogueId);
}
function findDialogueItemById(dialogue: IDialogueModel, itemId: string): any | null {
    if (dialogue.phrase.id == itemId) {
        return dialogue.phrase
    }
    const foundDialogueItem = findAnswerById2(dialogue.phrase.answers, itemId);
    return foundDialogueItem
}

function findPhraseById(phrases: IPhraseModel[], targetId) {
    for (const phrase of phrases) {
        if (phrase.id === targetId) {
            return phrase;
        }

        const foundInAnswers = findAnswerById2(phrase.answers, targetId);
        if (foundInAnswers) {
            return foundInAnswers;
        }

    }

    return null;
}


function findAnswerById2(answers: IAnswerModel[], targetId) {
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
