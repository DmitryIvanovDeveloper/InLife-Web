import IAnswerModel from "../../../ThreGame.Business/Models/IAnswerModel";
import IAnswerDto from "./DTO/IAnswerDto.ts";
import PhraseMapping from "./PhraseMapping.ts";

export default class AnswerMapping {

    constructor(private answer: any){}
    
    public toDtoResponse(): IAnswerModel {

        return {
            tensesList: this.answer.tenses,
            text: this.answer.text,
            wordsToUse: this.answer.wordsToUse,
            explanations: this.answer.mistakeExplanations,
            translates: this.answer.translates,
            phrases: this.answer.phrases.map(phrase => new PhraseMapping(phrase).mapToDtoResponse()),
            parentId: this.answer.parentPhraseId,
            id: this.answer.id
        }
    }

    public toDtoRequest(): IAnswerDto {
        return {
            tensesList: this.answer.tensesList,
            text: this.answer.text,
            wordsToUse: this.answer.wordsToUse,
            explanations: this.answer.explanations,
            translates: this.answer.translates,
            phrases: this.answer.phrases.map(phrase => new PhraseMapping(phrase).mapToDtoRequest()),
            parentPhraseId: this.answer.parentId,
            id: this.answer.id
        }
    }
}