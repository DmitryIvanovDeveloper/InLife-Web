import { atom, selectorFamily, useRecoilState, useRecoilValue } from "recoil";
import IDialogueStatistic from "../ThereGame.Business/Models/IDialogueStatistic";

const dialogueStatisticAtom = atom<IDialogueStatistic[]>({
    key: 'dialogueStatisticAtom',
    default: [],
})

export function useDialogueStatistic(id: string) {
    return useRecoilValue(dialogueStatisticSelectorFamily(id));
}
export function useDialoguesStatistic() {
    return useRecoilState(dialogueStatisticAtom);
}

const dialogueStatisticSelectorFamily = selectorFamily<IDialogueStatistic, string>({
    key: 'dialogueStatisticSelectorFamily',
    get: (dialogueId: string) => ({ get }) => {
        const dialogues = get(dialogueStatisticAtom);
        console.log(dialogues);
        console.log(dialogueId);
        return dialogues.find(dialogue => dialogue.id == dialogueId) as IDialogueStatistic
    },
    dangerouslyAllowMutability: true,
});