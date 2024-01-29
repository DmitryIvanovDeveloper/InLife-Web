import IMistakeExplanationDto from '../IMistakeExplanationDto';
import ITranslateDto from '../ITranslateDto';
import IPhraseResponseDto from './IPhraseResponseDto';

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