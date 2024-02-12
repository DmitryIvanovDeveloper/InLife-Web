import { injectable } from "inversify";
import { RoutesAPI } from "../../../Routes";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import IStudentDialogueStatisticService from "../../../ThereGame.Business/Domain/Util/Services/IDialogueStatisticService";
import StudentDialogueStatisticMapping from "../../../ThereGame.Api/Util/Mapping/StudentDialogueStatisticMapping";
import "reflect-metadata";

@injectable()
export default class StudentDialogueStatisticService implements IStudentDialogueStatisticService {

    public async GetByStudentId(id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${RoutesAPI.dialoguesStatistic}?id=${id}`);
            if (response.status == 204) {
                return new TypedResult<Status>(Status.NoContent);
            }
            if (response.status == 200) {
                var data = await response.json();

                var studentDialoguesStatistic = new StudentDialogueStatisticMapping().Response(data);
                return new TypedResult<Status>(Status.OK, studentDialoguesStatistic);
            }

            return new TypedResult<Status>(Status.Unknowed);

        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}