import IQuizleGameStatisticModel from "./IQuizleGameStatistic";
import ITranslateWordsGameStatistic from "./ITranslateWordsGameStatistic";

export default interface IStudentVocabularyBlockModel {
    id: string;
    studentId: string;
    name: string;
    createdAt: Date,
    wordsId: string[]
    quizlGameStatistics?: IQuizleGameStatisticModel[]
    translateWordsGameStatistic?: ITranslateWordsGameStatistic[]
}