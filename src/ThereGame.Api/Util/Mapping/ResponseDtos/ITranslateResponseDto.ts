import { LanguageType } from "../../../../ThereGame.Business/Models/LanguageType";

export default interface ITranslateResponseDto {
    answerParentId: string,
    id: string;
    language: LanguageType;
    text: string;
}