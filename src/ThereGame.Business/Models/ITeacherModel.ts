import { IDialogueModel } from "./IDialogueModel";
import IStudentModel from "./IStudentModel";

export default interface ITeacherModel {
    id: string,
    name: string;
    lastName: string;
    email: string;
    dialogues: IDialogueModel[],
    students: IStudentModel[],
}