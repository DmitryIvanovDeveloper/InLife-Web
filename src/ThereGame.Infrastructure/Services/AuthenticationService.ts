import { injectable } from "inversify";
import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import TypedResult from "../Statuses/Result";
import { Status } from "../Statuses/Status";
import ISignInRequestDto from "./Dto/ISignInRequestDto";
import ISignUpRequestDto from "./Dto/ISignUpRequestDto";
import "reflect-metadata";
import { RoutesAPI } from "../../Routes";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    
    async signInTeacher(request: ISignInRequestDto): Promise<TypedResult<Status>> {
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

            console.log(response);
            var data = await response.json();
            return new TypedResult<Status>(Status.OK, data);
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

    async signInStudent(request: ISignInRequestDto): Promise<TypedResult<Status>> {
        try {
            var response = await fetch(RoutesAPI.authSignIn, {
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