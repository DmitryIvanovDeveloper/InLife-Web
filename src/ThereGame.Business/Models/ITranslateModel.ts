import { LanguageType } from "../../Data/LanguageType";

export default interface ITranslateModel {
    readonly parentId: string,
    readonly id: string
    readonly language: LanguageType
    readonly text: string;
}