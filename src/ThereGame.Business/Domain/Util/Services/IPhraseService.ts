import IPhraseRequestDto from "../../../../ThereGame.Api/Util/Mapping/RequestDtos/IPhraseRequestDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IDialogueService {
    GetById(id: string): Promise<TypedResult<Status>>;
    Create(item: IPhraseRequestDto): Promise<TypedResult<Status>>;
    Update(item: IPhraseRequestDto): Promise<TypedResult<Status>>;
    Delete(id: string): Promise<TypedResult<Status>>;
}