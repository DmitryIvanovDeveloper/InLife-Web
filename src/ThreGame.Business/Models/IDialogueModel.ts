import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    id: string;
    name: string,
    phrase: IPhraseModel;
}