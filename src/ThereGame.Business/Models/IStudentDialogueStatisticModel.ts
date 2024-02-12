export default interface IStudentDialogueStatisticModel {
    dialogueId: string;
    studentId: string;
    dialogueHistory: IDialogueHistory[];
    startDate: Date;
    endDate: Date
}

export interface IDialogueHistory {
    orderId: number
    phraseId: string;
    phrase: string;
    answers: IStudentAnswer[]
}

export interface IStudentAnswer
{
    orderId: number,
    text: string
}