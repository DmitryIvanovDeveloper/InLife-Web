import { injectable } from "inversify";
import { RoutesAPI } from "../../Routes";
import ITeacherService from "../../ThereGame.Business/Domain/Util/Services/ITeacherService";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import "reflect-metadata";

@injectable()
export default class TeacherService implements ITeacherService {
    
    async getById(id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.teachersMe, {
                method: 'GET',
                headers: {
                    'X-THEREGAME-AUTH': `${id}`
                },
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }

            var data = await response.json();
          
            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}