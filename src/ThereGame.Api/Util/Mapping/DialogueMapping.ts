import { IDialogueModel } from "../../../ThereGame.Business/Models/IDialogueModel";
import { ICreateDialogueRequestDto, IDialogueRequestDto, IUpdateDialogueRequestDto } from "./RequestDtos/IDialogueRequestsDto";
import PhraseMapping from "./PhraseMapping";
import { IDialogueResponseDto } from "./ResponseDtos/IDialogueResponseDto";

export default class DialogueMapping {

    public response(dialogue: IDialogueResponseDto): IDialogueModel {
        return {
            isVoiceSelected: dialogue.isVoiceSelected,
            levelId: dialogue.levelId,
            isPublished: dialogue.isPublished,
            id: dialogue.id,
            userId: dialogue.userId,
            name: dialogue.name,
            phrase: new PhraseMapping().response(dialogue.phrase),
            students: dialogue.students
        }
    }

    public responseAllDialogues(dialogues: IDialogueResponseDto[]): IDialogueModel[] {
        return dialogues.map(dialogue => this.response(dialogue))
    }

    public request(dialogue: IDialogueModel): IDialogueRequestDto {
        return {
            isVoiceSelected: dialogue.isVoiceSelected,
            id: dialogue.id,
            name: dialogue.name,
            levelId: dialogue.levelId,
            userId: dialogue.userId,
            isPublished: dialogue.isPublished,
            phrase: new PhraseMapping().request(dialogue.phrase),
            students: dialogue.students
        }
    }

    public requestToCreateDialogue(dialogue: IDialogueModel): ICreateDialogueRequestDto {
        return {
            id: dialogue.id,
            name: dialogue.name,
            phraseId: dialogue.phrase.id,
            levelId: dialogue.levelId,
            userId: dialogue.userId,
            isPublished: dialogue.isPublished,
            isVoiceSelected: dialogue.isVoiceSelected,
            phrase: new PhraseMapping().request(dialogue.phrase),
            students: dialogue.students
        }
    }
    
    public requestToUpdateDialogue(dialogue: IDialogueModel): IUpdateDialogueRequestDto {
        return {
            isVoiceSelected: dialogue.isVoiceSelected,
            id: dialogue.id,
            name: dialogue.name,
            levelId: dialogue.levelId,
            userId: dialogue.userId,
            isPublished: dialogue.isPublished,
            phraseId: dialogue.phrase.id,
            students: dialogue.students
        }
    }
}