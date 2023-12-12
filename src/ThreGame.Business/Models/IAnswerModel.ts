import { IExplanationModel } from './ExplanationModel';
import IDialogueItemModel from './IDialogueItemModel';
import IPhraseModel from './IPhraseModel';
import ITranstate from './TranslateModel';

export default interface IAnswerModel extends IDialogueItemModel {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string[];
    readonly explanations: IExplanationModel[];
    readonly translates: ITranstate[];
    readonly phrases: IPhraseModel[];
    readonly parentId: string;
    readonly id: string;
}