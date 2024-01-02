import { atom, useRecoilState } from "recoil";

export function useTreeState() {
    return useRecoilState(treeStateAtom);
}

const treeStateAtom = atom<ITreeState>({
    key: 'treeStateAtom',
    default: {
        expanded: [],
        selected: []
    }
})

export interface ITreeState {
    expanded: string[];
    selected: string[];
}
