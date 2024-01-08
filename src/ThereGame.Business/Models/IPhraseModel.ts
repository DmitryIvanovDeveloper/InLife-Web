import { DialogueItemStateType } from "../Util/DialogueItemStateType";
import IAnswerModel from "./IAnswerModel";
import IAudioSettings from "./IAudioSettings";
import IDialogueItemModel from "./IDialogueItemModel";

export default interface IPhraseModel extends IDialogueItemModel {
    readonly parentId: string | null;
    readonly text: string;
    readonly answers: IAnswerModel[];
    readonly tensesList: string[];
    readonly comments: string;
    readonly audioSettings: IAudioSettings;
    
    readonly states?: DialogueItemStateType[];
}