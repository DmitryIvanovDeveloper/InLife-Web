import { atom, useRecoilState } from "recoil";

export function useSelectedDialogueItemSelection() {
    return useRecoilState(selectedDialogueItem)
}

export function useNextdDialogueItemSelection() {
    return useRecoilState(dialogueItem)
}

const selectedDialogueItem = atom<string>({
    key: 'selectedDialogueItem',
    default: "",
})

export function useNextDialogueItemSelection() {
    return useRecoilState(dialogueItem)
}

const dialogueItem = atom<string>({
    key: 'dialogieItem',
    default: "",
})
