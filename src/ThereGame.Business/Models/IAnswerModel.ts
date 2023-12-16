import { IMistakeExplanationModel } from './IExplanationModel';
import IDialogueItemModel from './IDialogueItemModel';
import IPhraseModel from './IPhraseModel';
import ITranstateModel from './ITranslateModel';

export default interface IAnswerModel extends IDialogueItemModel {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string;
    readonly mistakeExplanations: IMistakeExplanationModel[];
    readonly translates: ITranstateModel[];
    readonly phrases: IPhraseModel[];
    readonly parentId: string;
    readonly id: string;
}