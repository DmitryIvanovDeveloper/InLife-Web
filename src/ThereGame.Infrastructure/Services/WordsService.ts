import { injectable } from "inversify";
import "reflect-metadata";
import { RoutesAPI } from "../../Routes";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import IWordService from "../../ThereGame.Business/Domain/Util/Services/IWordService";

@injectable()
export default class WordService implements IWordService {
   
    async get(): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.words)

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