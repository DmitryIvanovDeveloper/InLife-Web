export default interface IDialogueStatistic {
    studentId: string;
    id: string;
    phraseAnswerHistory: IPhraseAnswerHistory[];
    date: Date;
}

export interface IPhraseAnswerHistory {
    phraseId: string;
    phrase: string;
    answers: string[]
}