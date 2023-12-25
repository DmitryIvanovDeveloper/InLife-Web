import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    isVoiceSelected: boolean,
    isPublished: boolean;
    userId: string;
    levelId: string;
    id: string;
    name: string,
    phrase: IPhraseModel;
}