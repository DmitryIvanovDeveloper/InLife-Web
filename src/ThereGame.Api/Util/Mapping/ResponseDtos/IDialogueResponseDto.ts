import IStudentModel from "../../../../ThereGame.Business/Models/IStudentModel";
import IPhraseResponseDto from "./IPhraseResponseDto";

export interface IDialogueResponseDto {
    isVoiceSelected: boolean,
    isPublished: boolean;
    levelId: string;
    teacherId: string;
    id: string;
    name: string;
    phrase: IPhraseResponseDto;
    studentsId: string[];
}