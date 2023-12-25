import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    isVoiceSelected: boolean,
    isPublished: boolean;
    levelId: string;
    id: string;
    name: string,
    phrase: IPhraseModel;
}