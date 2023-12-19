import IPhraseRequestDto from "./IPhraseRequestDto";

export interface IDialogueRequestDto {
    id: string;
    levelId: string,
    isPublished: boolean,
    name: string,
    phrase: IPhraseRequestDto;
}

export interface ICreateDialogueRequestDto {
    id: string;
    name: string,
    phraseId: string;
    levelId: string;
    isPublished: boolean,
    phrase: {
        id:  string,
        text:  string,
        tensesList:  string[],
        comments: string,
    }
}

export interface IUpdateDialogueRequestDto {
    id: string;
    name: string,
    levelId: string;
    isPublished: boolean,
    phraseId: string;
}