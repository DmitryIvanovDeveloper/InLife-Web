import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import ISignInModel from "../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../ThereGame.Business/Models/ISignUpModel";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AuthenticationMapping from "../Util/Mapping/AuthenticationMapping";

export default function useAuthenticationQuerisApi() {
    const authenticationService = appContainer.get<IAuthenticationService>(TYPES.AuthenticationService);

    return {
        signIn: (data: ISignInModel) => {
            var request = new AuthenticationMapping().requestSignIn(data);
            authenticationService.signIn(request);
        },

        signUp: (data: ISignUpModel) => {
            var request = new AuthenticationMapping().requestSignUp(data);
            authenticationService.signUp(request);
        }
    }
}