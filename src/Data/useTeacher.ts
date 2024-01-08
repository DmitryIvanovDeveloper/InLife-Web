import { atom, useRecoilState } from "recoil";
import ITeacherModel from "../ThereGame.Business/Models/ITeacherModel";

export function useTeacher() {
    return useRecoilState(teacherAtom);
}

const teacherAtom = atom<ITeacherModel | null>({
    key: 'teacherAtom',
    default: null
})
