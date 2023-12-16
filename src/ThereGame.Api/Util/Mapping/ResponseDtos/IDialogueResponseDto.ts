import IPhraseResponseDto from "./IPhraseResponseDto";

export interface IDialogueResponseDto {
    isPublished: boolean;
    id: string;
    name: string,
    phrase: IPhraseResponseDto;
}