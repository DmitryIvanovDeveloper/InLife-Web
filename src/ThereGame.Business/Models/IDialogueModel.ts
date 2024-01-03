import IPhraseModel from "./IPhraseModel";
import IStudentModel from "./IStudentModel";

export interface IDialogueModel {
    isVoiceSelected: boolean;
    isPublished: boolean;
    teacherId: string;
    levelId: string;
    id: string;
    name: string;
    phrase: IPhraseModel;
    studentsId: string[];
}