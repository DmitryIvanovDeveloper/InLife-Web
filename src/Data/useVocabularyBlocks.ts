import { atom, useRecoilState } from "recoil";
import IStudentVocabularyBlockModel from "../ThereGame.Business/Models/IStudentVocabularyBlock";

export function useVocabularyBlockState() {
    return useRecoilState(vocabularyBlocksAtom);
}

const vocabularyBlocksAtom = atom<IStudentVocabularyBlockModel[]>({
    key: 'vocabularyBlocksAtom',
    default: []
})

