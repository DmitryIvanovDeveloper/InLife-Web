import ITeacherRequestDto from "../../../../ThereGame.Infrastructure/Services/Dto/ITeacherRequestDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IWordService {
    get(): Promise<TypedResult<Status>>;
}