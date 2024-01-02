import IPhraseModel from "../../../ThereGame.Business/Models/IPhraseModel";
import AnswerMapping from "./AnswerMapping";
import IPhraseRequestDto from "./RequestDtos/IPhraseRequestDto";
import IPhraseResponseDto from "./ResponseDtos/IPhraseResponseDto";

export default class PhraseMapping {
    
    public response(phrase: IPhraseResponseDto): IPhraseModel {
        return {
            parentId: phrase.parentAnswerId,
            text: phrase.text,
            answers: phrase.answers.map(answer => new AnswerMapping().response(answer)),
            tensesList: phrase.tensesList,
            comments: phrase.comments,
            id: phrase.id,
            audioGenerationSettings: phrase.audioGenerationSettings,
            audioData: phrase.audioData,
        }
    }
    public request(phrase: IPhraseModel): IPhraseRequestDto {
        return {
            parentAnswerId: phrase.parentId,
            text: phrase.text,
            answers: phrase.answers.map(answer => new AnswerMapping().request(answer)),
            tensesList: phrase.tensesList,
            comments: phrase.comments,
            id: phrase.id,
            audioGenerationSettings: phrase.audioGenerationSettings,
        }
    }
}