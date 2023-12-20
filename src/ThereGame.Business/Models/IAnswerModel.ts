import { IMistakeExplanationModel } from './IExplanationModel';
import IDialogueItemModel from './IDialogueItemModel';
import IPhraseModel from './IPhraseModel';
import ITranslateModel from './ITranslateModel';

export default interface IAnswerModel extends IDialogueItemModel {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationModel[];
    readonly translates: ITranslateModel[];
    readonly phrases: IPhraseModel[];
    readonly parentId: string;
    readonly id: string;
}