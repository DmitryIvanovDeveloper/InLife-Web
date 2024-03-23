export default interface IBuildWordsGameStatistic {
    id: string;
    wordId: string;
    answers: string[];
    createdAt: Date;
    vocabularyBlockId: string;
}