import IMistakeExplanationResponseDto from './IExplanationResponseDto';
import IPhraseResponseDto from './IPhraseResponseDto';
import ITranslateResponseDto from './ITranslateResponseDto';

export default interface IAnswerResponseDto {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string;
    readonly explanations: IMistakeExplanationResponseDto[];
    readonly translates: ITranslateResponseDto[];
    readonly parentPhraseId: string;
    readonly id: string;
    readonly phrases: IPhraseResponseDto[];
}