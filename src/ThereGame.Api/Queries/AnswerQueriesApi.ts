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
        getById: async (id: string) => {
            var response = await answerService.GetById(id);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogueModel = new DialogueMapping().response(response.data);

            
            userQueriesApi.getById();
        },

        create: async (parentPhraseId: string) => {
            const dialogue: IAnswerModel = {
                tensesList: [],
                texts: ["New Phrase"],
                wordsToUse: "",
                mistakeExplanations: [],
                translates: [],
                phrases: [],
                parentId: parentPhraseId,
                id: uuidv4()
            }
            var requestData = new AnswerMapping().request(dialogue);

            var response = await answerService.Create(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            userQueriesApi.getById();

        },

        update: async (dialugueModel: IAnswerModel) => {
            var requestData = new AnswerMapping().request(dialugueModel);
            var response = await answerService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            userQueriesApi.getById();

        },

        delete: async (id: string) => {
            var response = await answerService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            setDialogueItemConstructor(() => null);

            userQueriesApi.getById();
        }
    }
}