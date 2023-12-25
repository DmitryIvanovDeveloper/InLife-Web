import { injectable } from "inversify";
import { Routes } from "../../Routes";
import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import ISignInRequestDto from "./Dto/ISignInRequestDto";
import ISignUpRequestDto from "./Dto/ISignUpRequestDto";
import "reflect-metadata";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    
    async signIn(request: ISignInRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(Routes.authSignIn, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            var data = await response.json();
           
            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async signUp(request: ISignUpRequestDto): Promise<TypedResult<Status>> {
        try {
            await fetch(Routes.authSignUp, {
                method: 'POST',
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