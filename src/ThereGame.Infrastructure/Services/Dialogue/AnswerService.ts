import { injectable } from "inversify";
import IAnswerRequestDto from "../../../ThereGame.Api/Util/Mapping/RequestDtos/IAnswerRequestDto";
import IAnswerService from "../../../ThereGame.Business/Domain/Util/Services/IAnswerService";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import { Routes } from "../../../Routes";


//@ts-ignore
@injectable()
export default class AnswerService implements IAnswerService {
    
    public async GetById(id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${Routes.answers}${id}`);
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
 
    public async Update(item: IAnswerRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.answers, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async Delete(id: string): Promise<TypedResult<Status>>{
        try {
            await fetch(`${Routes.answers}${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: id
            })
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async Create(item: IAnswerRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.answers, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}