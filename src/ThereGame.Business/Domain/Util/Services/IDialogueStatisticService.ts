import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IDialogueStatisticService {
    GetByStudentId(id: string): Promise<TypedResult<Status>>;
    Get(): Promise<TypedResult<Status>>;
}