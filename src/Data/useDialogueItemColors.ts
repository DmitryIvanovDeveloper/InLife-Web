import { atom, useRecoilState } from "recoil";
import { Color } from "@mui/material";

export function useDialogueItemColorsMap() {
    return useRecoilState(dialogueItemsColorsMap)
}

const dialogueItemsColorsMap = atom<IDialogueItemColorsMap[]>({
    key: 'dialogueItemsColorsMap',
    default: []
})


export interface IDialogueItemColorsMap {
    id: string,
    color: string
}