import { useDialogueItemConstructor } from "../../Data/useDialogues";
import IPhraseService from "../../ThereGame.Business/Domain/Util/Services/IPhraseService";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import PhraseMapping from "../Util/Mapping/PhraseMapping";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import useTeacherQueriesApi from "./TeacherQueriesApi";

export default function usePhraseQueriesApi() {

    const phraseService = appContainer.get<IPhraseService>(TYPES.PhraseService);
    var teacherQueriesApi = useTeacherQueriesApi();

    return {
        getById: async (id: string) => {
          
        },

        create: async (parentAnswerId: string): Promise<Status> => {
            const phrase: IPhraseModel = {
                parentId: parentAnswerId,
                text: "",
                answers: [],
                tensesList: [],
                comments: "",
                id: uuidv4(),
                audioGenerationSettings: "",
            }

            var requestData = new PhraseMapping().request(phrase);

            var response = await phraseService.Create(requestData);

            await teacherQueriesApi.getById();

            return response.status;
        },

        delete: async (id: string): Promise<Status> => {
            var response = await phraseService.Delete(id);

            teacherQueriesApi.getById();
            
            return response.status;
        },

        update: async (phrase: IPhraseModel): Promise<Status> => {
            var requestData = new PhraseMapping().request(phrase);
            var response = await phraseService.Update(requestData);
            
            teacherQueriesApi.getById();

            return response.status;
        }
    }
}