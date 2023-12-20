import { atom, useRecoilState } from "recoil";

export function useSelection() {
    return useRecoilState(selectionAtom)
}

const selectionAtom = atom<string>({
    key: 'selectionAtom',
    default: "",
})