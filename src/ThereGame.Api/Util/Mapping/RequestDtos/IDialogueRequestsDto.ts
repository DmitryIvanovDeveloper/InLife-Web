import IPhraseRequestDto from "./IPhraseRequestDto";

export interface IDialogueRequestDto {
    id: string;
    name: string,
    phrase: IPhraseRequestDto;
}

export interface ICreateDialogueRequestDto {
    id: string;
    name: string,
    phraseId: string;
    levelId: string;
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
    phraseId: string;
}