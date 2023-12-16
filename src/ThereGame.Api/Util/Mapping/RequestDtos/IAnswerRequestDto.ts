import IMistakeExplanationResponseDto from '../ResponseDtos/IExplanationResponseDto';
import IPhraseResponseDto from '../ResponseDtos/IPhraseResponseDto';
import ITranslateResponseDto from '../ResponseDtos/ITranslateResponseDto';

export default interface IAnswerRequestDto {
    readonly parentPhraseId: string;
    readonly id: string;
    readonly text: string;
    readonly tensesList: string[];
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationResponseDto[];
    readonly translates: ITranslateResponseDto[];
}