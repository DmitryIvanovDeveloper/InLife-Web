import { IMistakeExplanationModel } from '../../../ThereGame.Business/Models/IExplanationModel';
import IMistakeExplanationeDto from './IMistakeExplanationDto.ts';

export default class MistakeExplanationMapping {

    public response(mistakeExplanation: IMistakeExplanationeDto): IMistakeExplanationModel {
        return {
            parentId: mistakeExplanation.answerParentId,
            id: mistakeExplanation.id,
            word: mistakeExplanation.word,
            explanation: mistakeExplanation.explanation,
        }
    }

    public request(mistakeExplanation: IMistakeExplanationModel): IMistakeExplanationeDto {
        return {
            answerParentId: mistakeExplanation.parentId,
            id: mistakeExplanation.id,
            word: mistakeExplanation.word,
            explanation: mistakeExplanation.explanation,
        }
    } 
}