import { IQuizlWordModel } from "./IQuizleWordModel";

export interface IQuizleGameStatisticData {
    createdAt: Date
    quizlGameId: string;
    vocabularyBlockId: string;
    answers: IAnswerState[],
}

export interface IAnswerState {
    answer: string;
    isCorrect: boolean;
}