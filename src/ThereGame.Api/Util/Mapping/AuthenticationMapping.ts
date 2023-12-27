import ISignInModel from "../../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../../ThereGame.Business/Models/ISignUpModel";
import IUserModel from "../../../ThereGame.Business/Models/IUserModel";
import ISignInRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInRequestDto";
import ISignInResponseDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInResponseDto";
import ISignUpRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignUpRequestDto";
import DialogueMapping from "./DialogueMapping";

export default class AuthenticationMapping {
    requestSignIn(data: ISignInModel): ISignInRequestDto {
        return {
            email: data.email,
            password: data.password
        }
    }

    requestSignUp(data: ISignUpModel): ISignUpRequestDto {
        return {
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            password: data.password,
            email: data.email,
            teacherId: data?.teacherId
        }
    }

    responseSignUp(data: ISignInResponseDto): IUserModel {
        return {
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            dialogues: new DialogueMapping().responseAllDialogues(data.dialogues)
        }
    }
}