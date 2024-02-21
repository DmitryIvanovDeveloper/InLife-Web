import { atom, useRecoilState } from "recoil";
import IStudentModel from "../ThereGame.Business/Models/IStudentModel";
import INpc from "./Locations";

export function useNpcSelection() {
    return useRecoilState(npcSelection);
}

const npcSelection = atom<INpc | null>({
    key: 'npcSelection',
    default: null
})


