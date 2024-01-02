import ITeacherModel from "../../../ThereGame.Business/Models/ITeacherModel";
import ITeacherResponseDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInResponseDto";
import DialogueMapping from "./DialogueMapping";
import StudentMapping from "./StudentMapping";

export default class TeacherMapping {
    
    response(data: ITeacherResponseDto): ITeacherModel {
        return {
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            dialogues: new DialogueMapping().responseAllDialogues(data.dialogues),
            students: data.students.map(student => new StudentMapping().response(student))
        }
    }
}