import { IDialogueResponseDto } from "../../../ThereGame.Api/Util/Mapping/ResponseDtos/IDialogueResponseDto";

export default interface ISignInResponseDto {
    id: string,
    name: string,
    lastName: string,
    email: string,
    dialogues: IDialogueResponseDto[]
}