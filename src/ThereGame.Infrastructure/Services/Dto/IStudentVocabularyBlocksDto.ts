export default interface IStudentVocabularyRequestDto {
    id: string;
    studentId: string,
    name: string;
    wordsId: string[];
    createdAt: Date;
    quizlGameStatistics?: IQuizleGameStatisticDto[];
    translateWordsGameStatistics?: ITranslateWordGameStatisticDto[]
    buildWordsGameStatistics?: IBuuildWordGameStatisticDto[]
}

export interface IQuizleGameStatisticDto {
    id: string;
    quizlGameId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}

export interface ITranslateWordGameStatisticDto {
    id: string;
    wordId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}

export interface IBuuildWordGameStatisticDto {
    id: string;
    wordId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}