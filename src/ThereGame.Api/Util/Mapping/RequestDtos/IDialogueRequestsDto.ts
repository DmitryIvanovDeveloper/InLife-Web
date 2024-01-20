import IStudentModel from "../../../../ThereGame.Business/Models/IStudentModel";
import IPhraseRequestDto from "./IPhraseRequestDto";

export interface IDialogueRequestDto {
    id: string;
    levelId: string,
    teacherId: string,
    isPublished: boolean,
    name: string,
    voiceSettings: string,
    phrase: IPhraseRequestDto;
    studentsId: string[],
}

export interface ICreateDialogueRequestDto {
    id: string;
    name: string,
    phraseId: string;
    levelId: string;
    teacherId: string;
    isPublished: boolean,
    voiceSettings: string,
    studentsId: string[],
    phrase: {
        id:  string,
        text:  string,
        tensesList:  string[],
        comments: string,
    }
}

export interface IUpdateDialogueRequestDto {
    voiceSettings: string,
    id: string;
    name: string,
    levelId: string;
    teacherId: string;
    isPublished: boolean,
    phraseId: string;
    studentsId: string[],
}