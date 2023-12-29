import IAuthenticationService from "../../ThereGame.Business/Domain/Util/Services/IAuthenticationService";
import ISignInModel from "../../ThereGame.Business/Models/ISignInModel";
import ISignUpModel from "../../ThereGame.Business/Models/ISignUpModel";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AuthenticationMapping from "../Util/Mapping/AuthenticationMapping";
import { useNavigate } from "react-router-dom";

export default function useAuthenticationQueriesApi() {

    const authenticationService = appContainer.get<IAuthenticationService>(TYPES.AuthenticationService);
    const navigate = useNavigate();
    
    return {
        signInTeacher: async (data: ISignInModel) => {
            var request = new AuthenticationMapping().requestSignIn(data);
            
            var response = await authenticationService.signInTeacher(request);
            if (response.status != Status.OK)
            {
                return;
            }

            localStorage.setItem("[Teacher] - Token", response.data);

            navigate("/teacher");
        },

        signUpTeacher: async (data: ISignUpModel) => {
            var request = new AuthenticationMapping().requestSignUp(data);

            var response = await authenticationService.signUpTeacher(request);
            if (response.status != Status.OK)
            {
                return;
            }

            localStorage.setItem("[Teacher] - Token", response.data);

            navigate("/teacher");
        },

        signInStudent: async (data: ISignInModel) => {
            var request = new AuthenticationMapping().requestSignIn(data);
            
            var response = await authenticationService.signInStudent(request);
            if (response.status != Status.OK)
            {
                return;
            }

            localStorage.setItem("[Student] - Token", response.data);
        },

        signUpStudent: async (data: ISignUpModel) => {
            var request = new AuthenticationMapping().requestSignUp(data);

            var response = await authenticationService.signUpStudent(request);
            if (response.status != Status.OK)
            {
                return;
            }

            localStorage.setItem("[Student] - Token", response.data);
        },
    }
}