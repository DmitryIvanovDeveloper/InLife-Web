export default interface IQuizleGameStatisticModel {
    id: string;
    quizlGameId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}