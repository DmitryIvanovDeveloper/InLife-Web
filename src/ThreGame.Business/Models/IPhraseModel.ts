import IAnswerModel from "./IAnswerModel";
import IDialogueItemModel from "./IDialogueItemModel";

export default interface IPhraseModel extends IDialogueItemModel {
    readonly parentId: string
    readonly text: string;
    readonly answers: IAnswerModel[];
    readonly tensesList: string[];
    readonly comments: string;
}