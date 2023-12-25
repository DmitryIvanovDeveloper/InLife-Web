import IAnswerModel from "./IAnswerModel";
import IDialogueItemModel from "./IDialogueItemModel";

export default interface IPhraseModel extends IDialogueItemModel {
    readonly parentId: string | null;
    readonly text: string;
    readonly answers: IAnswerModel[];
    readonly tensesList: string[];
    readonly comments: string;
    readonly audioGenerationSettings: string;
}