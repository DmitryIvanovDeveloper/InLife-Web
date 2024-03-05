import { atom, useRecoilState } from "recoil";

export function useSelectedNodeToEditState() {
    return useRecoilState(selectedNodeToEditAtom);
}

const selectedNodeToEditAtom = atom<string>({
    key: 'selectedNodeToEditAtom',
    default: ""
})

