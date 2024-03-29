import { atom, useRecoilState } from "recoil";
import ICard from "../Components/FlashCards/ICard";

export function useSelectedStudentVocabularyBlockCards() {
    return useRecoilState(selectedStudentVocabularyBlockCards);
}

const selectedStudentVocabularyBlockCards = atom<ICard[]>({
    key: 'treselectedStudentVocabularyBlockCardseStateAtom',
    default: []
})
