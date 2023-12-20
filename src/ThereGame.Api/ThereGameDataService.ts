import DialogueMapping from "./Util/Mapping/DialogueMapping";
import IDialogueItemModel from "../ThereGame.Business/Models/IDialogueItemModel";
import { IDialogueModel } from "../ThereGame.Business/Models/IDialogueModel";
import IThereGameDataService from "../ThereGame.Business/Domain/Util/Services/IThereGameDataService"
import { injectable } from "inversify";
import IAnswerRequestDto from "./Util/Mapping/RequestDtos/IAnswerRequestDto";
import { ICreateDialogueRequestDto, IDialogueRequestDto } from "./Util/Mapping/RequestDtos/IDialogueRequestsDto";
import 'reflect-metadata';

@injectable()
export default class ThereGameDataService implements IThereGameDataService {

    public async UpdateDialogue(item: IDialogueRequestDto): Promise<IDialogueModel | null> {
       
        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/dialogues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Content-Length": `${Object.keys( JSON.stringify(item)).length}`
                },
                body: JSON.stringify(item)
            })
        }
        catch (error) {
            console.log(error)
        }

        return null;
    }
    
    public async GetDialogueById(id: string): Promise<IDialogueModel | null> {
        try {
            var response = await fetch(`${process.env.REACT_APP_SERVER}/api/dialogues/${id}`);
            console.log(response)
            var data = await response.json();
            return new DialogueMapping().response(data);
        }
        catch (error) {
            console.log(error)
        }

        return null;
    }

    public async Add(item: IDialogueItemModel): Promise<IDialogueModel | null> {

        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/dialogues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Content-Length": `${Object.keys( JSON.stringify(item)).length}`
                },
                body: JSON.stringify(item)
            })
        }
        catch (error) {
            console.log(error)
        }

        return null;
    }

    public async AddPhrase(item: IAnswerRequestDto): Promise<IDialogueModel | null> {

        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/phrases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
        }
        catch (error) {
            console.log(error)
        }

        return null;
    }

    public async CreateDialogue(item: ICreateDialogueRequestDto): Promise<IDialogueModel | null> {

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/dialogues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })

            const data = await response.json();
            return new DialogueMapping().response(data);
        }
        catch (error) {
            console.log(error)
        }

        return null

    }

    public async Delete(id: string): Promise<void>{
        try {
            await fetch(`${process.env.REACT_APP_SERVER}/api/levels/dialogue/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id})
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}