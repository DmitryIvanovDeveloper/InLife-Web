import IPhraseResponseDto from './IPhraseResponseDto';
import ITranslateDto from '../ITranslateDto';
import IMistakeExplanationDto from '../IMistakeExplanationDto';

export default interface IAnswerResponseDto {
    readonly tensesList: string[];
    readonly texts: string[];
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationDto[];
    readonly translates: ITranslateDto[];
    readonly parentPhraseId: string;
    readonly id: string;
    readonly phrases: IPhraseResponseDto[];
}