import { injectable } from "inversify";
import { Routes } from "../../Routes";
import IUserService from "../../ThereGame.Business/Domain/Util/Services/IUserService";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import "reflect-metadata";
import { ResultType } from "@remix-run/router/dist/utils";

@injectable()
export default class UserService implements IUserService {
    async getById(id: string) {
        try {
            var response = await fetch(Routes.teachersMe, {
                method: 'GET',
                headers: {
                    'X-THEREGAME-AUTH': `${id}`
                },
            })

            var data = await response.json();
           
            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}