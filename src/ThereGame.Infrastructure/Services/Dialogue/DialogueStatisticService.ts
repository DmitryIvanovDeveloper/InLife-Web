import { injectable } from "inversify";
import { RoutesAPI } from "../../../Routes";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import IDialogueStatisticService from "../../../ThereGame.Business/Domain/Util/Services/IDialogueStatisticService";
import "reflect-metadata";
import { DialogueStatistic } from "../../../Data/StudentStatistic/DIalogueStatistic";

@injectable()
export default class DialogueStatisticService implements IDialogueStatisticService {
    
    public async Get(): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.dialoguesStatistic);
            if (response.status == 204)
            {
                return new TypedResult<Status>(Status.NoContent);
            }
            
            var data = await response.json();
           
            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async GetByStudentId(id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${RoutesAPI.dialoguesStatistic}${id}`);
            if (response.status == 204)
            {
                return new TypedResult<Status>(Status.NoContent);
            }
            
            var data = await response.json();
           
            return new TypedResult<Status>(Status.OK, DialogueStatistic);
        }
        catch (error) {
            return new TypedResult<Status>(Status.OK, DialogueStatistic);

            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}