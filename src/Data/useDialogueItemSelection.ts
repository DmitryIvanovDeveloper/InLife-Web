import { atom, useRecoilState } from "recoil";

export function useSelectedDialogueItemSelection() {
    return useRecoilState(selectedDialogueItem)
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

export function useDialogueLineSelection() {
    return useRecoilState(dialogueLineSelection)
}

const dialogueLineSelection = atom<string>({
    key: 'dialogueLineSelection',
    default: "",
})
