import IStudentModel from "../../../../ThereGame.Business/Models/IStudentModel";
import IPhraseRequestDto from "./IPhraseRequestDto";

export interface IDialogueRequestDto {
    id: string;
    levelId: string,
    userId: string,
    isPublished: boolean,
    name: string,
    isVoiceSelected: boolean,
    phrase: IPhraseRequestDto;
    students: IStudentModel[],
}

export interface ICreateDialogueRequestDto {
    id: string;
    name: string,
    phraseId: string;
    levelId: string;
    userId: string;
    isPublished: boolean,
    isVoiceSelected: boolean,
    students: IStudentModel[],
    phrase: {
        id:  string,
        text:  string,
        tensesList:  string[],
        comments: string,
    }
}

export interface IUpdateDialogueRequestDto {
    isVoiceSelected: boolean,
    id: string;
    name: string,
    levelId: string;
    userId: string;
    isPublished: boolean,
    phraseId: string;
    students: IStudentModel[],
}