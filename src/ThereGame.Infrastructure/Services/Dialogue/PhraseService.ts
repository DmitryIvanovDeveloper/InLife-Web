import { injectable } from "inversify";
import IPhraseRequestDto from "../../../ThereGame.Api/Util/Mapping/RequestDtos/IPhraseRequestDto";
import IPhraseService from "../../../ThereGame.Business/Domain/Util/Services/IPhraseService";
import TypedResult from "../../Statuses/Result.ts";
import { Status } from "../../Statuses/Status.ts";
import { Routes } from "../../../Routes.ts";

//@ts-ignore
@injectable()
export default class PhraseService implements IPhraseService {
    
    public async GetById(id: string): Promise<TypedResult<Status>>  {
        try {
            var response = await fetch(`${Routes.phrases}${id}`);
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

    public async Update(item: IPhraseRequestDto): Promise<TypedResult<Status>> {
       
        try {
            await fetch(Routes.phrases, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async Delete(id: string): Promise<TypedResult<Status>> {
        try {
            await fetch(`${Routes.phrases}${id}`, {
                method: 'DELETE',
            })

            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async Create(item: IPhraseRequestDto): Promise<TypedResult<Status>>  {

        try {
            await fetch(Routes.phrases, {
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