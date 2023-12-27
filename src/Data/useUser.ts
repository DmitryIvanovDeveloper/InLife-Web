import { atom, useRecoilState } from "recoil";
import IUserModel from "../ThereGame.Business/Models/IUserModel";

export function useUser() {
    return useRecoilState(userAtom);
}

const userAtom = atom<IUserModel | null>({
    key: 'userAtom',
    default: null
})
