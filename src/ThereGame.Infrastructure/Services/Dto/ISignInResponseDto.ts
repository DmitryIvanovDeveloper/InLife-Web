import IStudentDto from "../../../ThereGame.Api/Util/Mapping/IStudentRequestDto";
import { IDialogueResponseDto } from "../../../ThereGame.Api/Util/Mapping/ResponseDtos/IDialogueResponseDto";

export default interface ITeacherResponseDto {
    id: string,
    name: string,
    lastName: string,
    email: string,
    dialogues: IDialogueResponseDto[],
    students: IStudentDto[]
}