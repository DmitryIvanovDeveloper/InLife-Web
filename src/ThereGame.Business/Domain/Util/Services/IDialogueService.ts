import { ICreateDialogueRequestDto, IDialogueRequestDto, IUpdateDialogueRequestDto } from "../../../../ThereGame.Api/Util/Mapping/RequestDtos/IDialogueRequestsDto";
import { IDialogueResponseDto } from "../../../../ThereGame.Api/Util/Mapping/ResponseDtos/IDialogueResponseDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IDialogueService {
    GetById(id: string): Promise<TypedResult<Status>>;
    Get(): Promise<TypedResult<Status>>;
    Create(item: ICreateDialogueRequestDto): Promise<TypedResult<Status>>;
    Update(item: IUpdateDialogueRequestDto): Promise<TypedResult<Status>>;
    Delete(id: string): Promise<TypedResult<Status>>;
}