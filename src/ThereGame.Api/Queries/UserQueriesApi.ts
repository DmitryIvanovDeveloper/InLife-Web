import { useDialogues } from "../../Data/useDialogues";
import { useStudents } from "../../Data/useStudents";
import { useUser } from "../../Data/useUser";
import IUserService from "../../ThereGame.Business/Domain/Util/Services/IUserService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import TeacherMapping from "../Util/Mapping/TeacherMapping";

export default function useUserQueriesApi() {

    const userService = appContainer.get<IUserService>(TYPES.UserService);

    const [_, setUser] = useUser();
    const [dialogue, setDialogues] = useDialogues();
    const [students, setStudents] = useStudents();
    
    return {
        getById: async (): Promise<boolean> => {
            var teacherId = localStorage.getItem("[Teacher] - Token");
            if (!teacherId)
            {
                return false;
            }

            var response = await userService.getById(teacherId);
            if (response.status != Status.OK)
            {
                return false;
            }
            
            var user = new TeacherMapping().response(response.data);
            setUser(user);
            setDialogues(user.dialogues);
            setStudents(user.students)
         
            return true;
        },
    }
}