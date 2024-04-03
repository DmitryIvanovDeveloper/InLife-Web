import { v4 as uuidv4 } from 'uuid';
import { useTeacher } from '../../Data/useTeacher';
import IDialogueService from "../../ThereGame.Business/Domain/Util/Services/IDialogueService";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import IPhraseModel from '../../ThereGame.Business/Models/IPhraseModel';
import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import DialogueMapping from "../Util/Mapping/DialogueMapping";
import { Status } from './../../ThereGame.Infrastructure/Statuses/Status';
import useTeacherQueriesApi from './TeacherQueriesApi';

export default function useDialogueQueriesApi() {
    const dialogueService = appContainer.get<IDialogueService>(TYPES.DialogueService);
    var teacherQueriesApi = useTeacherQueriesApi();
    
    const [teacher, _] = useTeacher();
    
    async function get(): Promise<IDialogueModel[]> {
        var response = await dialogueService.Get();
        if (response?.status != Status.OK ) {
            return [];
        }

        return new DialogueMapping().responseAllDialogues(response?.data);
    }

    return {
        get: async () => {
            var dialogues = await get();
            if(!dialogues){
                return;
            }

            await teacherQueriesApi.getById();
        },

        create: async (id: string) => {
            if (!teacher) {
                return;
            }

            var phrase: IPhraseModel = {
                parentId: "",
                text: '',
                answers: [],
                tensesList: [],
                comments: '',
                id: uuidv4(),
                audioSettings: {
                    id: uuidv4(),
                    generationSettings: ''
                }
            }

            const dialogue: IDialogueModel = {
                voiceSettings: "",
                isPublished: false,
                levelId: id,
                id: uuidv4(),
                name: '',
                phrase: phrase,
                teacherId: teacher?.id,
                studentsId: [],
                vocabularyWordsId: []
            }

            var requestData = new DialogueMapping().requestToCreateDialogue(dialogue);
            
            var response = await dialogueService.Create(requestData);
            if (response?.status != Status.OK) {
                return;
            }
            

            await teacherQueriesApi.getById();
            return response.status;
        },

        update: async (dialugueModel: IDialogueModel) => {

            var requestData = new DialogueMapping().requestToUpdateDialogue(dialugueModel);

            var response = await dialogueService.Update(requestData);
            if (response?.status != Status.OK) {
                return;
            }

            await teacherQueriesApi.getById();
        },

        delete: async (id: string) => {
            var response = await dialogueService.Delete(id);
            if (response?.status != Status.OK) {
                return;
            }

            await teacherQueriesApi.getById();
        }
    }
}

