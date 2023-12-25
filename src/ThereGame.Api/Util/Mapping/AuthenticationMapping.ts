import ISignInModel from "../../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../../ThereGame.Business/Models/ISignUpModel";
import ISignInRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignInRequestDto";
import ISignUpRequestDto from "../../../ThereGame.Infrastructure/Services/Dto/ISignUpRequestDto";

export default class AuthenticationMapping {
    requestSignIn(data: ISignInModel): ISignInRequestDto {
        return {
            email: data.email,
            password: data.password
        }
    }

    requestSignUp(data: ISignUpModel): ISignUpRequestDto {
        return {
            name: data.name,
            password: data.password,
            email: data.email,
        }
    }
}