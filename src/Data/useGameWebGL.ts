import { atom, useRecoilState } from "recoil";
import { ReactElement } from "react";

export function useGameWebGL() {
    return useRecoilState(gameWebGLEditor)
}
const gameWebGLEditor = atom<ReactElement | null>({
    key: 'gameWebGLEditor',
    default: null
})
