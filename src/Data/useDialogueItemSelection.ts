import { atom, useRecoilState } from "recoil";
import ISelectDialogueLine from "../Constructors/models/ISelectDialogueLine";

export function useSelectDialogueLine() {
    return useRecoilState(selectDialogueLine)
}

const defaultSelectDialogueLine: ISelectDialogueLine = {
    dialogueItemId: "",
    line: {
        id: "",
        name: ""
    },
    nextDialogueItemId: ""
}

const selectDialogueLine = atom<ISelectDialogueLine>({
    key: 'selectDialogueLine',
    default: defaultSelectDialogueLine
})
