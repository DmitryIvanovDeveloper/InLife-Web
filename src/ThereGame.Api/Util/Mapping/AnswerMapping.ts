import IAnswerModel from "../../../ThereGame.Business/Models/IAnswerModel.ts";
import PhraseMapping from "./PhraseMapping.ts";
import IAnswerRequestDto from "./RequestDtos/IAnswerRequestDto.ts";
import MistakeExplanationMapping from "./MistakeExplanationMapping.ts";
import TranslateMapping from "./TranslateMapping.ts";
import IAnswerResponseDto from "./ResponseDtos/IAnswerResponseDto.ts";

export default class AnswerMapping {

    public response(answer: IAnswerResponseDto): IAnswerModel {
        
        return {
            tensesList: answer.tensesList,
            text: answer.text,
            wordsToUse: answer.wordsToUse,
            mistakeExplanations: answer.explanations
                .map(mistakeExplanation => new MistakeExplanationMapping().response(mistakeExplanation)),
            translates: answer.translates
                .map(translate => new TranslateMapping().response(translate)),
            phrases: answer.phrases
                .map(phrase => new PhraseMapping().response(phrase)),
            parentId: answer.parentPhraseId,
            id: answer.id
        }
    }

    public request(answer: IAnswerModel): IAnswerRequestDto {
        return {
            parentPhraseId: answer.parentId,
            id: answer.id,
            text: answer.text,
            tensesList: answer.tensesList,
            wordsToUse: answer.wordsToUse,
            mistakeExplanations: answer.mistakeExplanations
                .map(mistakeExplanation => new MistakeExplanationMapping().request(mistakeExplanation)),
            translates: answer.translates
                .map(translate => new TranslateMapping().request(translate)),
        }
    }
}