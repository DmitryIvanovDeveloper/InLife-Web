import { atom, useRecoilState } from "recoil";
import { DialogueItemStateType } from "../ThereGame.Business/Util/DialogueItemStateType";

export function useDialogueItemState() {
    return useRecoilState(dialogueItemStateType)
}
const dialogueItemStateType = atom<DialogueItemStateType>({
    key: 'dialogueItemStateType',
    default: DialogueItemStateType.NoErrors
})
