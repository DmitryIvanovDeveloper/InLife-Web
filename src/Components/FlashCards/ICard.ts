export default interface ICard {
    id: string;
    question: string;
    answers: string[];
    options: number
    pictures: string[];
    quizleGamesId: string[];
    playedQuizlGame: number;
    playedWordTranslate: number;
    playedBuildWord: number;
}