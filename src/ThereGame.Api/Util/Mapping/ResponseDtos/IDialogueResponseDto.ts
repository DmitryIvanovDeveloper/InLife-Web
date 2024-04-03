import IPhraseResponseDto from "./IPhraseResponseDto";

export interface IDialogueResponseDto {
    voiceSettings: string,
    isPublished: boolean;
    levelId: string;
    teacherId: string;
    id: string;
    name: string;
    phrase: IPhraseResponseDto;
    studentsId: string[];
    vocabularyWordsId: string[];
}