import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    isPublished: boolean;
    levelId?: string;
    id: string;
    name: string,
    phrase: IPhraseModel;
}