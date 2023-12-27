import { injectable } from "inversify";
import IDialogueService from "../../../ThereGame.Business/Domain/Util/Services/IDialogueService";
import { ICreateDialogueRequestDto, IUpdateDialogueRequestDto } from "../../../ThereGame.Api/Util/Mapping/RequestDtos/IDialogueRequestsDto";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import { Routes } from "../../../Routes";
import "reflect-metadata";

@injectable()
export default class DialogueService implements IDialogueService {
    
    public async Get(): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(Routes.dialogues);
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

    public async GetById(id: string): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(`${Routes.dialogues}${id}`);
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
 
    public async Update(item: IUpdateDialogueRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.dialogues, {
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
            await fetch(`${Routes.dialogues}${id}`, {
                method: 'DELETE',
            })

            return new TypedResult<Status>(Status.OK);

        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    public async Create(item: ICreateDialogueRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.dialogues, {
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