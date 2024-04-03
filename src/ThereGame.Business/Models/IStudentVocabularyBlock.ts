import IBuildWordsGameStatistic from "./IBuildWordsGameStatistic";
import IQuizleGameStatisticModel from "./IQuizleGameStatistic";
import ITranslateWordsGameStatistic from "./ITranslateWordsGameStatistic";

export default interface IStudentVocabularyBlockModel {
    id: string;
    studentId: string;
    dialogueId: string;
    name: string;
    createdAt: Date,
    wordsId: string[]
    quizlGameStatistics: IQuizleGameStatisticModel[]
    translateWordsGameStatistics: ITranslateWordsGameStatistic[]
    buildWordsGameStatistics: IBuildWordsGameStatistic[]
}