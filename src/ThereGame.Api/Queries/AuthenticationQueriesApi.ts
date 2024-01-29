import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import ISignInModel from "../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../ThereGame.Business/Models/ISignUpModel";
import TypedResult from "../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AuthenticationMapping from "../Util/Mapping/AuthenticationMapping";

export default function useAuthenticationQueriesApi() {

    const authenticationService = appContainer.get<IAuthenticationService>(TYPES.AuthenticationService);
    
    return {
        signIn: async (data: ISignInModel): Promise<TypedResult<Status>> => {
            var request = new AuthenticationMapping().requestSignIn(data);
            
            var response = await authenticationService.signIn(request);
            if (response.status == Status.OK)
            {
                localStorage.setItem("[Teacher] - Token", response.data.token);
            }

            return response;
        },

        signUpTeacher: async (data: ISignUpModel): Promise<TypedResult<Status>> => {
            var request = new AuthenticationMapping().requestSignUp(data);

            var response = await authenticationService.signUpTeacher(request);
            if (response.status == Status.OK)
            {
                localStorage.setItem("[Teacher] - Token", response.data);
            }


            return response;
        },

        signUpStudent: async (data: ISignUpModel): Promise<Status> => {
            var request = new AuthenticationMapping().requestSignUp(data);

            var response = await authenticationService.signUpStudent(request);
            if (response.status == Status.OK)
            {
                localStorage.setItem("[Student] - Token", response.data);
            }

            return response.status;
        },
    }
}