import ITeacherModel from "../../../ThereGame.Business/Models/ITeacherModel";
import ITeacherRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ITeacherRequestDto";
import ITeacherResponseDto from "../../../ThereGame.Infrastructure/Services/Dto/ITeacherResponseDto";
import { ITeacherBio } from "../../../components/Profile/ProfileEditor";
import DialogueMapping from "./DialogueMapping";
import StudentMapping from "./StudentMapping";

export default class TeacherMapping {
    
    response(data: ITeacherResponseDto): ITeacherModel {
        return {
            avatar: data.avatar,
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            dialogues: new DialogueMapping().responseAllDialogues(data.dialogues),
            students: data.students.map(student => new StudentMapping().response(student))
        }
    }

    request(data: ITeacherBio) : ITeacherRequestDto{
        return {
            avatar: data.avatar,
            name: data.name,
            lastName: data.lastName,
        }
    }
}