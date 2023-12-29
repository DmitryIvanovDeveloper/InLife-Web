import { atom, useRecoilState } from "recoil";
import IStudentModel from "../ThereGame.Business/Models/IStudentModel";

export function useStudents() {
    return useRecoilState(studentAtom);
}

const studentAtom = atom<IStudentModel[]>({
    key: 'studentAtom',
    default: []
})
