export default interface IStudentDialogueStatisticResponseDto {
    dialogueId: string;
    studentId: string;
    dialogueHistory: IDialogueHistoryDto[];
    startDate: Date;
    endDate: Date
}

export interface IDialogueHistoryDto {
    phraseId: string;
    phrase: string;
    answers: string[]
}