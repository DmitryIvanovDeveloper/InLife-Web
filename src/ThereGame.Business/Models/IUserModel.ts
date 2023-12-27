import { IDialogueModel } from "./IDialogueModel";

export default interface IUserModel {
    id: string,
    name: string;
    lastName: string;
    email: string;
    dialogues: IDialogueModel[]
}