import { injectable } from "inversify";
import { Routes } from "../../../Routes";
import IAuthenticationService from "../../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import TypedResult from "../../Statuses/Result";
import { Status } from "../../Statuses/Status";
import ISignInRequestDto from "../Dto/ISignInRequestDto";
import ISignUpRequestDto from "../Dto/ISignUpRequestDto";
import "reflect-metadata";

@injectable()
export default class AuthenticationService implements IAuthenticationService {

    async signIn(request: ISignInRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.authSignIn, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async signUp(request: ISignUpRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.authSignUp, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })
            return new TypedResult<Status>(Status.OK);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }
}