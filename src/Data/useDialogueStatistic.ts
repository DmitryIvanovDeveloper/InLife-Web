import { atom, selectorFamily, useRecoilState, useRecoilValue } from "recoil";
import IStudentDialogueStatisticModel from "../ThereGame.Business/Models/IStudentDialogueStatisticModel";

const dialogueStatisticAtom = atom<IStudentDialogueStatisticModel[]>({
    key: 'dialogueStatisticAtom',
    default: [],
})

export function useDialogueStatistic(id: string) {
    return useRecoilValue(dialogueStatisticSelectorFamily(id));
}
export function useDialoguesStatistic() {
    return useRecoilState(dialogueStatisticAtom);
}

const dialogueStatisticSelectorFamily = selectorFamily<IStudentDialogueStatisticModel, string>({
    key: 'dialogueStatisticSelectorFamily',
    get: (dialogueId: string) => ({ get }) => {
        const dialogues = get(dialogueStatisticAtom);
        return dialogues.find(dialogue => dialogue.dialogueId == dialogueId) as IStudentDialogueStatisticModel
    },
    dangerouslyAllowMutability: true,
});