import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import IStudentService from "../../ThereGame.Business/Domain/Util/Services/IStudentService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import IStudentVocabularyBlockModel from "../../ThereGame.Business/Models/IStudentVocabularyBlock";
import StudentVocabularyBlockMapping from "../Util/Mapping/StudentVocabularyBlockMapping";
import ICreateStudentVocabularyBlockDto from "../../ThereGame.Infrastructure/Services/Dto/ICreateStudentVocabularyBlockDto";
import { v4 as uuidv4 } from 'uuid';

export default function useStudentQueriesApi() {

    const wordsService = appContainer.get<IStudentService>(TYPES.StudentService);

    const getVocabularyBlocks = async (studentId: string): Promise<IStudentVocabularyBlockModel[]> => {
        var token = localStorage.getItem("Token");
        if (!token || !studentId) {
            return [];
        }
        const result = await wordsService.getVocabularyBlocks(token, studentId);
        if (result.status == Status.OK) {
            return new StudentVocabularyBlockMapping().response(result.data);

        }

        return []
    }
    return {
        updateVocabularyBlock: async (studentVocabularyBlock: IStudentVocabularyBlockModel): Promise<IStudentVocabularyBlockModel[]> => {
            var token = localStorage.getItem("Token");
            if (!token) {
                return[];
            }


            const studentVocabularyRequest = new StudentVocabularyBlockMapping().request(studentVocabularyBlock);

            await wordsService.updateVocabularyBlock(studentVocabularyRequest, token);
            return await getVocabularyBlocks(studentVocabularyBlock.studentId);

        },

        getVocabularyBlocks: async (studentId: string): Promise<IStudentVocabularyBlockModel[]> => {
            return getVocabularyBlocks(studentId);
        },

        createVocabularyBlock: async (studentId: string, blocksLength: number): Promise<IStudentVocabularyBlockModel[]> => {

            var token = localStorage.getItem("Token");
            if (!token || !studentId) {
                return [];
            }

            const dto: ICreateStudentVocabularyBlockDto = {
                id: uuidv4(),
                studentId: studentId,
                order: blocksLength + 1,
                name: `Block ${blocksLength + 1}`
            }

            await wordsService.createVocabularyBlocks(dto, token);

            return await getVocabularyBlocks(studentId);
        }
    }
}