import IAnswerRequestDto from "../../../../ThereGame.Api/Util/Mapping/RequestDtos/IAnswerRequestDto";;
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IAnswerService {
    GetById(id: string): Promise<TypedResult<Status>>;
    Create(item: IAnswerRequestDto):  Promise<TypedResult<Status>>;
    Update(item: IAnswerRequestDto):  Promise<TypedResult<Status>>;
    Delete(id: string):  Promise<TypedResult<Status>>;
}