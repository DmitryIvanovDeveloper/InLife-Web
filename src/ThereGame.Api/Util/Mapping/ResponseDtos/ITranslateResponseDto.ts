import { LanguageType } from "../../../../Data/LanguageType";

export default interface ITranslateResponseDto {
    answerParentId: string,
    id: string;
    language: LanguageType;
    text: string;
}