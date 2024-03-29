import ITeacherRequestDto from "../../../../ThereGame.Infrastructure/Services/Dto/ITeacherRequestDto";
import IWordDto, { IWordRequestDto } from "../../../../ThereGame.Infrastructure/Services/Dto/IWordDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IWordService {
    update(teacherId: string, data: IWordRequestDto): Promise<TypedResult<Status>>;
    get(): Promise<TypedResult<Status>>;
    create(teacherid: string, request: IWordRequestDto ): Promise<TypedResult<Status>>;
}