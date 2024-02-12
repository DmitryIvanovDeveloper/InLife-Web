export default interface IStudentDialogueStatisticModel {
    dialogueId: string;
    studentId: string;
    dialogueHistory: IDialogueHistory[];
    startDate: Date;
    endDate: Date
}

export interface IDialogueHistory {
    phraseId: string;
    phrase: string;
    answers: IStudentAnswer[]
}

export interface IStudentAnswer
{
    orderId: number,
    answer: string
}