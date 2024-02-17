import IDialogueLine from "./IDialogueLine";

export default interface ISelectDialogueLine {
    dialogueItemId: string;
    line: IDialogueLine;
    nextDialogueItemId: string;
}