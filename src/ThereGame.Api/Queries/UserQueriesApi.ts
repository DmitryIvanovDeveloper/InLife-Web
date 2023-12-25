import { useUser } from "../../Data/useUser";
import IUserService from "../../ThereGame.Business/Domain/Util/Services/IUserService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AuthenticationMapping from "../Util/Mapping/AuthenticationMapping";
import { useNavigate } from "react-router-dom";

export default function useUserQuerisApi() {

    const userService = appContainer.get<IUserService>(TYPES.UserService);
    const navigate = useNavigate();

    const [_, setUser] = useUser();
    
    return {
        getById: async () => {
            var id = localStorage.getItem("Id");
            if (!id)
            {
                navigate("/sign-in");
                return;
            }

            var response = await userService.getById(id);
            if (response.status != Status.OK)
            {
                return;
            }

            var user = new AuthenticationMapping().responseSignUp(response.data);
            setUser(user);
    
            localStorage.setItem("Id", user.id);
    
            navigate("/builder");
        },
    }
}