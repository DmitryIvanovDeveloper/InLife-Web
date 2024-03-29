import IQuizlWordModel from "../../../ThereGame.Business/Models/IQuizleWordModel";
import IQuizGameDto from "../../../ThereGame.Infrastructure/Services/Dto/IQuizlWordDto";

export default class QuizlGameMapping {

    public response(quizleGames: IQuizGameDto[]): IQuizlWordModel[] {
        return quizleGames.map(quizleGameDto => {
            return {
                id: quizleGameDto.id,
                data: quizleGameDto.data,
                hiddenWordId: quizleGameDto.hiddenWordId
            }
        });
    
    }
    public request(quizleGame: IQuizlWordModel, teacherId: string): IQuizGameDto {
        return {
            id: quizleGame.id,
            teacherId: teacherId,
            data: quizleGame.data,
            hiddenWordId: quizleGame.hiddenWordId
        }
    }
}