import IMistakeExplanationDto from './IMistakeExplanationDto';
import IPhraseResponseDto from './IPhraseResponseDto';
import ITranslateDto from '../ITranslateDto';

export default interface IAnswerResponseDto {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationDto[];
    readonly translates: ITranslateDto[];
    readonly parentPhraseId: string;
    readonly id: string;
    readonly phrases: IPhraseResponseDto[];
}