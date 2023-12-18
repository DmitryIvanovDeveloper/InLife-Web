import IPhraseResponseDto from "./IPhraseResponseDto";

export interface IDialogueResponseDto {
    isPublished: boolean;
    levelId: string;
    id: string;
    name: string;
    phrase: IPhraseResponseDto;
}