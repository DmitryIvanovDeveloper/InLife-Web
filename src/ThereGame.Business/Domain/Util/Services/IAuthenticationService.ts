import ISignInRequestDto from "../../../../ThereGame.Infrastructure/Services/Dto/ISignInRequestDto";
import ISignUpRequestDto from "../../../../ThereGame.Infrastructure/Services/Dto/ISignUpRequestDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IAuthenticationService {
    signIn(data: ISignInRequestDto): Promise<TypedResult<Status>>;
    signUp(data: ISignUpRequestDto): Promise<TypedResult<Status>>;
}