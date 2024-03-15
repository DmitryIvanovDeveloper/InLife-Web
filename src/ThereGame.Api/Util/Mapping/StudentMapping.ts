import IStudentModel from "../../../ThereGame.Business/Models/IStudentModel";
import IStudentDto from "./IStudentRequestDto";

export default class StudentMapping {
    public request(student: IStudentModel): IStudentDto {
        return {
            id: student.id,
            name: student.name,
            lastName: student.lastName,
            email: student.email,
            avatar: student.avatar,
        }
    }

    public response(student: IStudentDto): IStudentModel {
        return {
            id: student.id,
            name: student.name,
            lastName: student.lastName,
            email: student.email,
            avatar: student.avatar,
        }
    }
}