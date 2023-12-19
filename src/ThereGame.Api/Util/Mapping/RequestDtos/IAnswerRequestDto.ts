import IMistakeExplanationDto from '../ResponseDtos/IMistakeExplanationDto';
import ITranslateDto from '../ITranslateDto';

export default interface IAnswerRequestDto {
    readonly parentPhraseId: string;
    readonly id: string;
    readonly text: string;
    readonly tensesList: string[];
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationDto[];
    readonly translates: ITranslateDto[];
}