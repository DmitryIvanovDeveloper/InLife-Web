export default interface IQuizleGameModel {
    id: string;
    data: string;
    hiddenWordId: string;
}

export  interface IQuizlWordModel {
    word: string,
    order: number,
    wordId: string,
    isHidden: boolean
}