import { useDialogues } from "../../Data/useDialogues";
import { useStudents } from "../../Data/useStudents";
import { useTeacher } from "../../Data/useTeacher";
import ITeacherService from "../../ThereGame.Business/Domain/Util/Services/ITeacherService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { ITeacherBio } from "../../Components/Profile/ProfileEditor";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import TeacherMapping from "../Util/Mapping/TeacherMapping";
import { RoleType } from "../../ThereGame.Business/Util/Role";

export default function useTeacherQueriesApi() {

    const teacherService = appContainer.get<ITeacherService>(TYPES.TeacherService);

    const [_, setTeacher] = useTeacher();
    const [dialogue, setDialogues] = useDialogues();
    const [students, setStudents] = useStudents();
    
    return {
        getById: async (): Promise<any> => {
            var token = localStorage.getItem("Token");
            if (!token)
            {
                return Status.Unauthorized;
            }

            var response = await teacherService.getById(token);
            if (response.status == Status.OK)
            {
                var teacher = new TeacherMapping().response(response.data);
                setTeacher(teacher);
                setDialogues(teacher.dialogues);
                setStudents(teacher.students)
            }
         
            return response.data;
        },

        update: async (data: ITeacherBio, id: string): Promise<Status> => {
            
            var request = new TeacherMapping().request(data);
            var response = await teacherService.update(request, id);
            return response.status;
        }
    }
}