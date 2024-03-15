import { LanguageType } from "../../Data/LanguageType";

export default interface WordModel{
    id: string;
    word: string;
    pictures: string[]
    wordTranslates: IWordTrasnalteModel[];
}

export interface IWordTrasnalteModel {
    id: string;
    wordId: string;
    language: LanguageType;
    translates: string[];
}