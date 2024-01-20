import IAnswerModel from "../../../ThereGame.Business/Models/IAnswerModel";
import PhraseMapping from "./PhraseMapping";
import IAnswerRequestDto from "./RequestDtos/IAnswerRequestDto";
import MistakeExplanationMapping from "./MistakeExplanationMapping";
import TranslateMapping from "./TranslateMapping";
import IAnswerResponseDto from "./ResponseDtos/IAnswerResponseDto";

export default class AnswerMapping {

    public response(answer: IAnswerResponseDto): IAnswerModel {
        return {
            tensesList: answer.tensesList,
            texts: answer.texts,
            wordsToUse: answer.wordsToUse,
            mistakeExplanations: answer.mistakeExplanations
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
            texts: answer.texts,
            tensesList: answer.tensesList,
            wordsToUse: answer.wordsToUse,
            mistakeExplanations: answer.mistakeExplanations
                .map(mistakeExplanation => new MistakeExplanationMapping().request(mistakeExplanation)),
            translates: answer.translates
                .map(translate => new TranslateMapping().request(translate)),
        }
    }
}