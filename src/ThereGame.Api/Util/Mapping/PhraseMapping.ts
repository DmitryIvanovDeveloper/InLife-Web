import IPhraseModel from "../../../ThreGame.Business/Models/IPhraseModel";
import AnswerMapping from "./AnswerMapping.ts";
import IPhraseDto from "./DTO/IPhraseDto.ts";

export default class PhraseMapping {
    constructor(private phrase: any){}
    
    public mapToDtoResponse(): IPhraseModel {
        return {
            parentId: this.phrase.parentAnswerId,
            text: this.phrase.text,
            answers: this.phrase.answers.map(answer => new AnswerMapping(answer).toDtoRequest()),
            tensesList: this.phrase.tenses,
            comments: this.phrase.comments,
            id: this.phrase.id
        }
    }
    public mapToDtoRequest(): IPhraseDto {
        return {
            parentAnswerId: this.phrase.parentId,
            text: this.phrase.text,
            answers: this.phrase.answers.map(answer => new AnswerMapping(answer).toDtoRequest()),
            tensesList: this.phrase.tensesList,
            comments: this.phrase.comments,
            id: this.phrase.id
        }
    }
}