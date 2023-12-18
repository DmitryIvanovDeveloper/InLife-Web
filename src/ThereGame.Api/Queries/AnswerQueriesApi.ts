import { useDialogueItemConstructor, useUpdateDialogue } from "../../Data/useDialogues.ts";
import IAnswerService from "../../ThereGame.Business/Domain/Util/Services/IAnswerService.ts";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel.ts";
import { appContainer } from "../../inversify.config.ts";
import { TYPES } from "../../types.ts";
import AnswerMapping from "../Util/Mapping/AnswerMapping.ts";
import DialogueMapping from "../Util/Mapping/DialogueMapping.ts";
import { v4 as uuidv4 } from 'uuid';
import useDialogieQueriesApi from "./DialogueQueriesApi.ts";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status.ts";

export default function useAnswerQueriesApi() {
    const answerService = appContainer.get<IAnswerService>(TYPES.AnswerService);
    var updateDialogue =  useUpdateDialogue();
    var dialogieQueriesApi = useDialogieQueriesApi();
    
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    return {
        getById: async (id: string) => {
            var response = await answerService.GetById(id);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogueModel = new DialogueMapping().response(response.data);

            updateDialogue.byId(dialogueModel);
        },

        create: async (parentPhraseId: string) => {
            const dialogue: IAnswerModel = {
                tensesList: [],
                text: "New Answer",
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

            dialogieQueriesApi.get();
        },

        update: async (dialugueModel: IAnswerModel) => {
            var requestData = new AnswerMapping().request(dialugueModel);
            var response = await answerService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            dialogieQueriesApi.get();
        },

        delete: async (id: string) => {
            var response = await answerService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            setDialogueItemConstructor(() => null);

            dialogieQueriesApi.get();
        }
    }
}