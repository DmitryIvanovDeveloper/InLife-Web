import { useDialogueItemConstructor } from "../../Data/useDialogues";
import IAnswerService from "../../ThereGame.Business/Domain/Util/Services/IAnswerService";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import AnswerMapping from "../Util/Mapping/AnswerMapping";
import DialogueMapping from "../Util/Mapping/DialogueMapping";
import { v4 as uuidv4 } from 'uuid';
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import useUserQueriesApi from "./UserQueriesApi";

export default function useAnswerQueriesApi() {
    const answerService = appContainer.get<IAnswerService>(TYPES.AnswerService);
    var userQueriesApi = useUserQueriesApi();
    
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    return {
        getById: async (id: string): Promise<Status> => {
            var response = await answerService.GetById(id);
            
            await userQueriesApi.getById();

            return response.status;
        },

        create: async (parentPhraseId: string): Promise<Status> => {
            const dialogue: IAnswerModel = {
                tensesList: [],
                texts: ["New Answer"],
                wordsToUse: "",
                mistakeExplanations: [],
                translates: [],
                phrases: [],
                parentId: parentPhraseId,
                id: uuidv4()
            }
            var requestData = new AnswerMapping().request(dialogue);

            var response = await answerService.Create(requestData);

            await userQueriesApi.getById();

            return response.status;
        },

        update: async (dialugueModel: IAnswerModel): Promise<Status> => {
            var requestData = new AnswerMapping().request(dialugueModel);
            var response = await answerService.Update(requestData);
           

            await userQueriesApi.getById();
            return response.status;
        },

        delete: async (id: string): Promise<Status> => {
            var response = await answerService.Delete(id);

            await userQueriesApi.getById();
            return response.status;
        }
    }
}