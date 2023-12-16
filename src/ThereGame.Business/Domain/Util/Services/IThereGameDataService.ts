import IAnswerRequestDto from "../../../../ThereGame.Api/Util/Mapping/RequestDtos/IAnswerRequestDto";
import { ICreateDialogueRequestDto, IDialogueRequestDto } from "../../../../ThereGame.Api/Util/Mapping/RequestDtos/IDialogueRequestsDto";
import IDialogueItemModel from "../../../Models/IDialogueItemModel";
import { IDialogueModel } from "../../../Models/IDialogueModel";

export default interface IThereGameDataService {
    Add(item: IDialogueItemModel): Promise<IDialogueModel | null>;
    AddPhrase(item: IAnswerRequestDto): Promise<IDialogueModel | null>;
}