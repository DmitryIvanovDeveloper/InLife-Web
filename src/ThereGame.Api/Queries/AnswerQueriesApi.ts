import { v4 as uuidv4 } from 'uuid';
import IAnswerService from "../../ThereGame.Business/Domain/Util/Services/IAnswerService";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AnswerMapping from "../Util/Mapping/AnswerMapping";
import useTeacherQueriesApi from "./TeacherQueriesApi";

export default function useAnswerQueriesApi() {
    const answerService = appContainer.get<IAnswerService>(TYPES.AnswerService);
    var teacherQueriesApi = useTeacherQueriesApi();
    
    return {
        getById: async (id: string): Promise<Status> => {
            var response = await answerService.GetById(id);
            
            await teacherQueriesApi.getById();

            return response.status;
        },

        create: async (parentPhraseId: string): Promise<Status> => {
            const dialogue: IAnswerModel = {
                tensesList: [],
                texts: [],
                wordsToUse: "",
                mistakeExplanations: [],
                translates: [],
                phrases: [],
                parentId: parentPhraseId,
                id: uuidv4()
            }
            var requestData = new AnswerMapping().request(dialogue);

            var response = await answerService.Create(requestData);

            await teacherQueriesApi.getById();

            return response.status;
        },

        update: async (dialugueModel: IAnswerModel): Promise<Status> => {
            var requestData = new AnswerMapping().request(dialugueModel);
            var response = await answerService.Update(requestData);
           

            await teacherQueriesApi.getById();
            return response.status;
        },

        delete: async (id: string): Promise<Status> => {
            var response = await answerService.Delete(id);

            await teacherQueriesApi.getById();
            return response.status;
        }
    }
}