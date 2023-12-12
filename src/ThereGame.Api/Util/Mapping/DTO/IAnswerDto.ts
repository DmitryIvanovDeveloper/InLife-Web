import { IExplanationDto } from './IExplanationDto';
import IPhraseDto from './IPhraseDto';
import IPhraseModel from './IPhraseDto';
import ITranlsateDto from './ITranslateDto';

export default interface IAnswerDto {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string[];
    readonly explanations: IExplanationDto[];
    readonly translates: ITranlsateDto[];
    readonly phrases: IPhraseDto[];
    readonly parentPhraseId: string;
    readonly id: string;
}