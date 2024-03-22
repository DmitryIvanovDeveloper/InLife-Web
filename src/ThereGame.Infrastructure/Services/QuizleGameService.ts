import { injectable } from "inversify";
import { RoutesAPI } from "../../Routes";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import IQuizlGameService from "../../ThereGame.Business/Domain/Util/Services/IQuizleGameService";
import "reflect-metadata";

@injectable()
export default class QuizlGameService implements IQuizlGameService {
  
    async create(request: any, teacherId: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.quizlGames, {
                method: 'POST',
                headers: {
                    'X-THEREGAME-AUTH': `${teacherId}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }
            
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async get(ids: string[], teacherId: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${RoutesAPI.quizlGames}?ids=${JSON.stringify(ids)}`, {
                headers: {
                    'X-THEREGAME-AUTH': `${teacherId}`,
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