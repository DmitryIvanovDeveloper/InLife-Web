import { LanguageType } from "../../Data/LanguageType";
import { SpeechPart } from "./SpeechPart";

export default interface WordModel{
    id: string;
    word: string;
    speechParts: SpeechPart[];
    pictures: string[];
    forms: string;
    quizlGamesId: string[];
    wordTranslates: IWordTrasnalteModel[];
}

export interface IWordTrasnalteModel {
    id: string;
    wordId: string;
    language: LanguageType;
    translates: string[];
}