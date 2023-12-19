import { LanguageType } from "../../../Data/LanguageType";

export default interface ITranslateDto {
    answerParentId: string,
    id: string;
    language: LanguageType;
    text: string;
}