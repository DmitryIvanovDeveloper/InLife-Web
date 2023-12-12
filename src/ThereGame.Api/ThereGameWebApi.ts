import DialogueMapping from "./Util/Mapping/DialogueMapping.ts";
import IDialogueItemModel from "../ThreGame.Business/Models/IDialogueItemModel.ts";
import { IDialogueModel } from "../ThreGame.Business/Models/IDialogueModel.ts";


export default class ThereGameWebApi {

    public async Get(id: string) {

        try {
            var response = await fetch(`https://9c0e-212-58-103-245.ngrok-free.app/api/dialogues/6f827457-1aef-4025-a6f0-981c5d5d138b`);
            var data = await response.json();
            return new DialogueMapping(data).mapToDtoResponse();
        }
        catch (error) {
            console.log(error)
        }
    }

    public async Add(item: IDialogueItemModel) {

        
        try {
            await fetch('https://9c0e-212-58-103-245.ngrok-free.app/api/dialogues', {
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
    }

    public async CreateDialogue(item: IDialogueModel) {

        var dto = new DialogueMapping(item).mapToDtoRequest();
        try {
            await fetch('https://9c0e-212-58-103-245.ngrok-free.app/api/dialogues', {
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
    }

    public async Remove(id: string) {
        try {
            await fetch('https://06ff-146-255-225-30.ngrok-free.app/api/levels/dialogue/update', {
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