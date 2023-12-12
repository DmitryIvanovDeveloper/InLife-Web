import { IDialogueModel } from "../../../ThreGame.Business/Models/IDialogueModel";
import { IDialogueDto } from "./DTO/IDialogueDto.ts";
import PhraseMapping from "./PhraseMapping.ts";

export default class DialogueMapping {
    constructor(private dialogue: any){}

    public mapToDtoResponse(): IDialogueModel {
        return  {
            id: this.dialogue.id,
            name: this.dialogue.name,
            phrase: new PhraseMapping(this.dialogue.phrase).mapToDtoResponse() 
        }
    }

    public mapToDtoRequest(): IDialogueDto {
        return  {
            id: this.dialogue.id,
            name: this.dialogue.name,
            phrase: new PhraseMapping(this.dialogue.phrase).mapToDtoRequest() 
        }
    }
}