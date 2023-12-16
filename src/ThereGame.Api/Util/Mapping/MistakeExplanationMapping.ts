import { IMistakeExplanationModel } from '../../../ThereGame.Business/Models/IExplanationModel';
import IMistakeExplanationResponseDto from './ResponseDtos/IExplanationResponseDto';

export default class MistakeExplanationMapping {

    public response(mistakeExplanation: IMistakeExplanationResponseDto): IMistakeExplanationModel {
        return {
            parentId: mistakeExplanation.answerParentId,
            id: mistakeExplanation.id,
            word: mistakeExplanation.word,
            text: mistakeExplanation.text,
        }
    }

    public request(mistakeExplanation: IMistakeExplanationModel): IMistakeExplanationResponseDto {
        return {
            answerParentId: mistakeExplanation.parentId,
            id: mistakeExplanation.id,
            word: mistakeExplanation.word,
            text: mistakeExplanation.text,
        }
    } 
}