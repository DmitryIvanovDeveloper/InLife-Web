import { useDialogueItemConstructor } from "../../Data/useDialogues";
import IPhraseService from "../../ThereGame.Business/Domain/Util/Services/IPhraseService";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import PhraseMapping from "../Util/Mapping/PhraseMapping";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import useUserQueriesApi from "./UserQueriesApi";

export default function usePhraseQueriesApi() {

    const phraseService = appContainer.get<IPhraseService>(TYPES.PhraseService);
    var userQueriesApi = useUserQueriesApi();

    return {
        getById: async (id: string) => {
          
        },

        create: async (parentAnswerId: string) => {
            const phrase: IPhraseModel = {
                parentId: parentAnswerId,
                text: "New Phrase",
                answers: [],
                tensesList: [],
                comments: "",
                id: uuidv4(),
                audioGenerationSettings: ""
            }

            var requestData = new PhraseMapping().request(phrase);

            var response = await phraseService.Create(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            await userQueriesApi.getById();
        },

        delete: async (id: string) => {
            var response = await phraseService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            userQueriesApi.getById();
        },

        update: async (phrase: IPhraseModel) => {
            var requestData = new PhraseMapping().request(phrase);
            var response = await phraseService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            userQueriesApi.getById();
        }
    }
}