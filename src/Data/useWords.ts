import { atom, useRecoilState } from "recoil";
import IWordModel from "../ThereGame.Business/Models/IWordModel";

export function useWordsState() {
    return useRecoilState(wordsAtom);
}

const wordsAtom = atom<IWordModel[]>({
    key: 'treeStateAtom',
    default: []
})
