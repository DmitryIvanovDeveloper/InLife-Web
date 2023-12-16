import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    isPublished: boolean;
    id: string;
    name: string,
    phrase: IPhraseModel;
}