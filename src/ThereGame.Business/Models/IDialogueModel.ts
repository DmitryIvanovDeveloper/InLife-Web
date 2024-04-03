import IPhraseModel from "./IPhraseModel";

export interface IDialogueModel {
    voiceSettings: string;
    isPublished: boolean;
    teacherId: string;
    levelId: string;
    id: string;
    name: string;
    phrase: IPhraseModel;
    studentsId: string[];
    vocabularyWordsId: string[];
}