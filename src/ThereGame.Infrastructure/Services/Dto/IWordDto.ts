import { LanguageType } from "../../../Data/LanguageType";
import { SpeechPart } from "../../../ThereGame.Business/Models/SpeechPart";

export default interface IWordDto{
    id: string;
    word: string;
    pictures: string[];
    speechPart: SpeechPart;
    translates: IWordTrasnalteDto[];
}

export interface IWordTrasnalteDto {
    id: string;
    wordId: string;
    language: LanguageType;
    translates: string[];
}

export interface IWordRequestDto{
    id: string;
    word: string;
    speechPart: SpeechPart;
    pictures: string[];
    translatesData: IWordTrasnalteDto[];
}