import { Status } from './../../ThereGame.Infrastructure/Statuses/Status.ts';
import { useUpdateDialogue } from "../../Data/useDialogues.ts";
import IDialogueService from "../../ThereGame.Business/Domain/Util/Services/IDialogueService.ts";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel.ts";
import { appContainer } from "../../inversify.config.ts";
import { TYPES } from "../../types.ts";
import DialogueMapping from "../Util/Mapping/DialogueMapping.ts";
import { v4 as uuidv4 } from 'uuid';
import IPhraseModel from '../../ThereGame.Business/Models/IPhraseModel.ts';

export default function useDialogieQueriesApi() {
    const dialogueService = appContainer.get<IDialogueService>(TYPES.DialogueService);
    var updateDialogue =  useUpdateDialogue();

    const get = async () => {
        var response = await dialogueService.Get();
        console.log(response)

        if (response?.status != Status.OK) {
            return null;
        }
        return new DialogueMapping().responseAllDialogues(response?.data);
    }

    return {
        get: async () => {
            var dialogues = await get();
            if(!dialogues?.length){
                return;
            }

            console.log(dialogues)

            updateDialogue.all(dialogues);
        },

        getById: async (id: string) => {
            var response = await dialogueService.GetById(id);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogueModel = new DialogueMapping().response(response?.data);

            updateDialogue.byId(dialogueModel);
        },

        create: async () => {

            var phrase: IPhraseModel = {
                parentId: null,
                text: 'New Phrase',
                answers: [],
                tensesList: [],
                comments: '',
                id: uuidv4()
            }

            const dialogue: IDialogueModel = {
                isPublished: false,
                levelId: process.env.REACT_APP_LOCATION_BUS_STATION,
                id: uuidv4(),
                name: 'New Dialogue',
                phrase: phrase
            }

            var requestData = new DialogueMapping().requestToCreateDialogue(dialogue);

            var response = await dialogueService.Create(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogues = await get();
            if(!dialogues){
                return;
            }

            updateDialogue.all(dialogues);
        },

        update: async (dialugueModel: IDialogueModel) => {
            var requestData = new DialogueMapping().requestToUpdateDialogue(dialugueModel);
            var response = await dialogueService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogues = await get();
            if(!dialogues){
                return;
            }

            updateDialogue.all(dialogues);
        },

        delete: async (id: string) => {
            var response = await dialogueService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            var dialogues = await get();
            if(!dialogues){
                return;
            }

            updateDialogue.all(dialogues);
        }
    }
}