import { LanguageType } from "../../../Data/LanguageType";

export default interface IWordResponseDto
{
    id: string;
    word: string;
    translates: IWordTrasnalteResponseDto[];
}

export interface IWordTrasnalteResponseDto {
    
    id: string;
    wordId: string;
    language: LanguageType;
    translates: string[];
}