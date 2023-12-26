import { useDialogues } from "../../Data/useDialogues";
import { useUser } from "../../Data/useUser";
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

    const [_, setUser] = useUser();
    const [dialogues, setDialogues] = useDialogues();
    
    return {
        signIn: async (data: ISignInModel) => {
            var request = new AuthenticationMapping().requestSignIn(data);
            
            var response = await authenticationService.signIn(request);
            if (response.status != Status.OK)
            {
                return;
            }

            var user = new AuthenticationMapping().responseSignUp(response.data);

            setUser(user);
            setDialogues(user.dialogues);
            console.log(user)
            localStorage.setItem("Id", user.id);

            navigate("/builder");
        },

        signUp: async (data: ISignUpModel) => {
            var request = new AuthenticationMapping().requestSignUp(data);

            authenticationService.signUp(request);
        }
    }
}