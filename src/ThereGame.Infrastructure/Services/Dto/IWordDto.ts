import { LanguageType } from "../../../Data/LanguageType";

export default interface IWordDto{
    id: string;
    word: string;
    pictures: string[];
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
    pictures: string[];
    translatesData: IWordTrasnalteDto[];
}