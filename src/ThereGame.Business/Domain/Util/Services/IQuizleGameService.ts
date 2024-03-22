import IQuizGameDto from "../../../../ThereGame.Infrastructure/Services/Dto/IQuizlWordDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IQuizleGameService {
    create(data: IQuizGameDto, token: string): Promise<TypedResult<Status>>;
    get(ids: string[], teacherId: string): Promise<TypedResult<Status>>;
}