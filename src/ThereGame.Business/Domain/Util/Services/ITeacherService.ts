import ITeacherRequestDto from "../../../../ThereGame.Infrastructure/Services/Dto/ITeacherRequestDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface ITeacherService {
    update(request: ITeacherRequestDto,  id: string): Promise<TypedResult<Status>>
    getById(id: string): Promise<TypedResult<Status>>;
}