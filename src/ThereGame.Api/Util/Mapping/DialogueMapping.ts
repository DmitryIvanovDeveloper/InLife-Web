import { IDialogueModel } from "../../../ThereGame.Business/Models/IDialogueModel";
import PhraseMapping from "./PhraseMapping";
import { ICreateDialogueRequestDto, IDialogueRequestDto, IUpdateDialogueRequestDto } from "./RequestDtos/IDialogueRequestsDto";
import { IDialogueResponseDto } from "./ResponseDtos/IDialogueResponseDto";

export default class DialogueMapping {

    public response(dialogue: IDialogueResponseDto): IDialogueModel {
        return {
            voiceSettings: dialogue.voiceSettings,
            levelId: dialogue.levelId,
            isPublished: dialogue.isPublished,
            id: dialogue.id,
            teacherId: dialogue.teacherId,
            name: dialogue.name,
            phrase: new PhraseMapping().response(dialogue.phrase),
            studentsId: dialogue.studentsId,
            vocabularyWordsId: dialogue.vocabularyWordsId,
        }
    }

    public responseAllDialogues(dialogues: IDialogueResponseDto[]): IDialogueModel[] {
        return dialogues.map(dialogue => this.response(dialogue))
    }

    public request(dialogue: IDialogueModel): IDialogueRequestDto {
        return {
            voiceSettings: dialogue.voiceSettings,
            id: dialogue.id,
            name: dialogue.name,
            levelId: dialogue.levelId,
            teacherId: dialogue.teacherId,
            isPublished: dialogue.isPublished,
            phrase: new PhraseMapping().request(dialogue.phrase),
            studentsId: dialogue.studentsId,
            vocabularyWordsId: dialogue.vocabularyWordsId,
        }
    }

    public requestToCreateDialogue(dialogue: IDialogueModel): ICreateDialogueRequestDto {
        return {
            id: dialogue.id,
            name: dialogue.name,
            phraseId: dialogue.phrase.id,
            levelId: dialogue.levelId,
            teacherId: dialogue.teacherId,
            isPublished: dialogue.isPublished,
            voiceSettings: dialogue.voiceSettings,
            phrase: new PhraseMapping().request(dialogue.phrase),
            studentsId: dialogue.studentsId,
            vocabularyWordsId: dialogue.vocabularyWordsId,
        }
    }
    
    public requestToUpdateDialogue(dialogue: IDialogueModel): IUpdateDialogueRequestDto {
        return {
            voiceSettings: dialogue.voiceSettings,
            id: dialogue.id,
            name: dialogue.name,
            levelId: dialogue.levelId,
            teacherId: dialogue.teacherId,
            isPublished: dialogue.isPublished,
            phraseId: dialogue.phrase.id,
            studentsId: dialogue.studentsId,
            vocabularyWordsId: dialogue.vocabularyWordsId,
        }
    }
}