import { LanguageType } from "../../Data/LanguageType";

export default interface ITranstateModel {
    readonly parentId: string,
    readonly id: string
    readonly language: LanguageType
    readonly text: string;
}