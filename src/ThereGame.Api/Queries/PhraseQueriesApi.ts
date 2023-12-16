import {useUpdateDialogue } from "../../Data/useDialogues.ts";
import IPhraseService from "../../ThereGame.Business/Domain/Util/Services/IPhraseService.ts";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel.ts";
import { appContainer } from "../../inversify.config.ts";
import { TYPES } from "../../types.ts";
import DialogueMapping from "../Util/Mapping/DialogueMapping.ts";
import { v4 as uuidv4 } from 'uuid';
import PhraseMapping from "../Util/Mapping/PhraseMapping.ts";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status.ts";
import useDialogieQueriesApi from "./DialogueQueriesApi.ts";

export default function usePhraseQueriesApi() {

    const phraseService = appContainer.get<IPhraseService>(TYPES.PhraseService);
    var updateDialogue =  useUpdateDialogue();
    var dialogieQueriesApi = useDialogieQueriesApi();
    
    return {
        getById: async (id: string) => {
            var response = await phraseService.GetById(id);
            if (response?.status != Status.OK) {
                return;
            }
            var dialogueModel = new DialogueMapping().response(response.data);

            updateDialogue.byId(dialogueModel);
        },

        create: async (parentAnswerId: string) => {
            const phrase: IPhraseModel = {
                parentId: parentAnswerId,
                text: "New Phrase",
                answers: [],
                tensesList: [],
                comments: "",
                id: uuidv4()
            }

            var requestData = new PhraseMapping().request(phrase);

            var response = await phraseService.Create(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            dialogieQueriesApi.get();
        },

        delete: async (id: string) => {
            var response = await phraseService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            dialogieQueriesApi.get();
        },

        update: async (phrase: IPhraseModel) => {
            var requestData = new PhraseMapping().request(phrase);

            var response = await phraseService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            dialogieQueriesApi.get();
        }
    }
}