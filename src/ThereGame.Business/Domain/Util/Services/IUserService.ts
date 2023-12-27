import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IUserService {
    getById(id: string): Promise<TypedResult<Status>>;
}