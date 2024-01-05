import { useDialogues } from "../../Data/useDialogues";
import { useStudents } from "../../Data/useStudents";
import { useTeacher } from "../../Data/useTeacher";
import ITeacherService from "../../ThereGame.Business/Domain/Util/Services/ITeacherService";
import ITeacherModel from "../../ThereGame.Business/Models/ITeacherModel";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { ITeacherBio } from "../../components/Profile/ProfileEditor";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import TeacherMapping from "../Util/Mapping/TeacherMapping";

export default function useTeacherQueriesApi() {

    const teacherService = appContainer.get<ITeacherService>(TYPES.teacherService);

    const [_, setTeacher] = useTeacher();
    const [dialogue, setDialogues] = useDialogues();
    const [students, setStudents] = useStudents();
    
    return {
        getById: async (): Promise<Status> => {
            var teacherId = localStorage.getItem("[Teacher] - Token");
            if (!teacherId)
            {
                return Status.Unauthorized;
            }

            var response = await teacherService.getById(teacherId);
            if (response.status == Status.OK)
            {
                var teacher = new TeacherMapping().response(response.data);
                setTeacher(teacher);
                setDialogues(teacher.dialogues);
                setStudents(teacher.students)
            }
         
            return response.status;
        },

        update: async (data: ITeacherBio, id: string): Promise<Status> => {
            
            var request = new TeacherMapping().request(data);
            var response = await teacherService.update(request, id);
            return response.status;
        }
    }
}