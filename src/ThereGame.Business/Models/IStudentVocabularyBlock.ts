import IQuizleGameStatisticModel from "./IQuizleGameStatistic";

export default interface IStudentVocabularyBlockModel {
    id: string;
    studentId: string;
    name: string;
    createdAt: Date,
    wordsId: string[]
    quizlGameStatistics?: IQuizleGameStatisticModel[]
}