export default interface ITranslateWordsGameStatistic {
    id: string;
    wordId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}