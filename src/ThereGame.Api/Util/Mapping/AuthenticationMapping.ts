import ISignInModel from "../../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../../ThereGame.Business/Models/ISignUpModel";
import ITeacherModel from "../../../ThereGame.Business/Models/ITeacherModel";
import ISignInResponseDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInResponseDto";
import ISignInRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInRequestDto";
import ISignUpRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignUpRequestDto";
import { RoleType } from "../../../ThereGame.Business/Util/Role";

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

    responseSignIn(data: any): ISignInResponseDto {
        return {
            token: data.Token,
            role: data.Role,
        }
    }
}