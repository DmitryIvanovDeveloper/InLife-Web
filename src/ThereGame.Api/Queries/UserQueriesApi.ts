import { useDialogues } from "../../Data/useDialogues";
import { useUser } from "../../Data/useUser";
import IUserService from "../../ThereGame.Business/Domain/Util/Services/IUserService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AuthenticationMapping from "../Util/Mapping/AuthenticationMapping";
import { useNavigate } from "react-router-dom";

export default function useUserQueriesApi() {

    const userService = appContainer.get<IUserService>(TYPES.UserService);
    const navigate = useNavigate();

    const [_, setUser] = useUser();
    const [dialogue, setDialogues] = useDialogues();
    
    return {
        getById: async () => {
            var id = localStorage.getItem("Id");
            if (!id)
            {
                // navigate("/sign-in/teacher");
                return;
            }

            var response = await userService.getById(id);
            if (response.status != Status.OK)
            {
                return;
            }

            var user = new AuthenticationMapping().responseSignUp(response.data);
            setUser(user);
            setDialogues(user.dialogues);
            console.log(user);
            localStorage.setItem("Id", user.id);
    
            navigate("/builder");
        },
    }
}