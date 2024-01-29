import { injectable } from "inversify";
import "reflect-metadata";
import { RoutesAPI } from "../../Routes";
import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import ISignInRequestDto from "./Dto/ISignInRequestDto";
import ISignUpRequestDto from "./Dto/ISignUpRequestDto";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    
    async signIn(request: ISignInRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.authSignIn, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.status == 401) {
                return new TypedResult<Status>(Status.Unauthorized);
            }

            if (response.status == 200)
            {
                var data = await response.json();
                return new TypedResult<Status>(Status.OK, data);
            }

            return new TypedResult<Status>(Status.Unknowed);

        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async signUpTeacher(request: ISignUpRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.authSignUpTeacher, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })

            if (response.status == 409) {
                return new TypedResult<Status>(Status.Conflict);
            }

            var data = await response.json();

            return new TypedResult<Status>(Status.OK, data);
        }
        catch (error) {
            return new TypedResult<Status>(Status.InternalServerError);
        }
    }

    async signUpStudent(request: ISignUpRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.authSignUpStudent, {
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
}
