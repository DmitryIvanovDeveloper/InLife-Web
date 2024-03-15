import { injectable } from "inversify";
import "reflect-metadata";
import { RoutesAPI } from "../../Routes";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import IWordService from "../../ThereGame.Business/Domain/Util/Services/IWordService";
import IWordDto, { IWordRequestDto } from "./Dto/IWordDto";

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
    async create(teacherId: string, request: IWordRequestDto): Promise<TypedResult<Status>>{
        try {
            var response = await fetch(RoutesAPI.words, {
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

    async update(teacherId: string, request: IWordRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.words, {
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
}