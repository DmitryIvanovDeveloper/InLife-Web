import { IDialogueModel } from "../../../ThereGame.Business/Models/IDialogueModel.ts";
import { ICreateDialogueRequestDto, IDialogueRequestDto, IUpdateDialogueRequestDto } from "./RequestDtos/IDialogueRequestsDto.ts";
import PhraseMapping from "./PhraseMapping.ts";
import { IDialogueResponseDto } from "./ResponseDtos/IDialogueResponseDto.ts";

export default class DialogueMapping {

    public response(dialogue: IDialogueResponseDto): IDialogueModel {
        return  {
            levelId: dialogue.levelId,
            isPublished: dialogue.isPublished,
            id: dialogue.id,
            name: dialogue.name,
            phrase: new PhraseMapping().response(dialogue.phrase) 
        }
    }

    public responseAllDialogues(dialogues: IDialogueResponseDto[]): IDialogueModel[] {
        return dialogues.map(dialogue => ({
            isPublished: dialogue.isPublished,
            id: dialogue.id,
            levelId: dialogue.levelId,
            name: dialogue.name,
            phrase: new PhraseMapping().response(dialogue.phrase) 
        }))
    }

    public request(dialogue: IDialogueModel): IDialogueRequestDto {
        return  {
            id: dialogue.id,
            name: dialogue.name,
            phrase: new PhraseMapping().request(dialogue.phrase) 
        }
    }

    public requestToCreateDialogue(dialogue: IDialogueModel): ICreateDialogueRequestDto {
        return  {
            id: dialogue.id,
            name: dialogue.name,
            phraseId: dialogue.phrase.id,
            levelId: dialogue.levelId,
            phrase: {
                id:  dialogue.phrase.id,
                text:  dialogue.phrase.text,
                tensesList:  dialogue.phrase.tensesList,
                comments: dialogue.phrase.comments,
            }
        }
    }
    public requestToUpdateDialogue(dialogue: IDialogueModel): IUpdateDialogueRequestDto {
        return  {
            id: dialogue.id,
            name: dialogue.name,
            phraseId: dialogue.phrase.id
        }
    }
}