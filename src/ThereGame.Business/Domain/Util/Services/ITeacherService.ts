import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface ITeacherService {
    getById(id: string): Promise<TypedResult<Status>>;
}