import IPhraseResponseDto from "./IPhraseResponseDto";

export interface IDialogueResponseDto {
    isVoiceSelected: boolean,
    isPublished: boolean;
    levelId: string;
    id: string;
    name: string;
    phrase: IPhraseResponseDto;
}