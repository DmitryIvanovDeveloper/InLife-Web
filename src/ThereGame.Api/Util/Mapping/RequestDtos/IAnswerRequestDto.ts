import IMistakeExplanationDto from '../IMistakeExplanationDto';
import ITranslateDto from '../ITranslateDto';

export default interface IAnswerRequestDto {
    readonly parentPhraseId: string;
    readonly id: string;
    readonly texts: string[];
    readonly tensesList: string[];
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationDto[];
    readonly translates: ITranslateDto[];
}