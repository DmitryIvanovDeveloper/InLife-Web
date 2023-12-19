import IPhraseModel from "../../../ThereGame.Business/Models/IPhraseModel.ts";
import AnswerMapping from "./AnswerMapping.ts";
import IPhraseRequestDto from "./RequestDtos/IPhraseRequestDto.ts";
import IPhraseResponseDto from "./ResponseDtos/IPhraseResponseDto.ts";

export default class PhraseMapping {
    
    public response(phrase: IPhraseResponseDto): IPhraseModel {
        return {
            parentId: phrase.parentAnswerId,
            text: phrase.text,
            answers: phrase.answers.map(answer => new AnswerMapping().response(answer)),
            tensesList: phrase.tensesList,
            comments: phrase.comments,
            id: phrase.id
        }
    }
    public request(phrase: IPhraseModel): IPhraseRequestDto {
        return {
            parentAnswerId: phrase.parentId,
            text: phrase.text,
            answers: phrase.answers.map(answer => new AnswerMapping().request(answer)),
            tensesList: phrase.tensesList,
            comments: phrase.comments,
            id: phrase.id
        }
    }
}