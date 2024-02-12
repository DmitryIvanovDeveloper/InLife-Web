import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IStudentDialogueStatisticService {
    GetByStudentId(id: string): Promise<TypedResult<Status>>;
}