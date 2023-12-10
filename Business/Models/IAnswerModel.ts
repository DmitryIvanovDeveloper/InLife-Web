import { ExplanationModel } from './ExplanationModel';
import IDialogueItemModel from './IDialogueItemModel';
import IPhraseModel from './IPhraseModel';

export default interface IAnswerModel extends IDialogueItemModel {
    readonly tensesList: string[];
    readonly text: string;
    readonly wordsToUse: string[];
    readonly explanations: ExplanationModel[];
    readonly phrases: IPhraseModel[];
    readonly parentId: string
}