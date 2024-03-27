import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import IVocabularyBlockService from "../../ThereGame.Business/Domain/Util/Services/IVocabularyBlockService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import IStudentVocabularyBlockModel from "../../ThereGame.Business/Models/IStudentVocabularyBlock";
import StudentVocabularyBlockMapping from "../Util/Mapping/StudentVocabularyBlockMapping";
import ICreateStudentVocabularyBlockDto from "../../ThereGame.Infrastructure/Services/Dto/ICreateStudentVocabularyBlockDto";
import { v4 as uuidv4 } from 'uuid';

export default function useVocabularyBlockQueriesApi() {

    const wordsService = appContainer.get<IVocabularyBlockService>(TYPES.VocabularyBlockService);

    const get = async (studentId: string): Promise<IStudentVocabularyBlockModel[]> => {
        var token = localStorage.getItem("Token");
        if (!token || !studentId) {
            return [];
        }
        const result = await wordsService.get(token, studentId);
        if (result.status == Status.OK) {
            return new StudentVocabularyBlockMapping().response(result.data);
        }

        return []
    }

    return {
        update: async (studentVocabularyBlock: IStudentVocabularyBlockModel): Promise<IStudentVocabularyBlockModel[]> => {
            var token = localStorage.getItem("Token");
            if (!token) {
                return[];
            }


            const studentVocabularyRequest = new StudentVocabularyBlockMapping().request(studentVocabularyBlock);

            await wordsService.update(studentVocabularyRequest, token);
            return await get(studentVocabularyBlock.studentId);

        },

        get: async (studentId: string): Promise<IStudentVocabularyBlockModel[]> => {
            const vocabularyBlocks = await get(studentId);
            return vocabularyBlocks;
        },

        create: async (studentId: string, blocksLength: number): Promise<IStudentVocabularyBlockModel[]> => {

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

            await wordsService.create(dto, token);

            return await get(studentId);
        },
        delete: async (vocabularyId: string, studentId: string): Promise<IStudentVocabularyBlockModel[]> => {

            var token = localStorage.getItem("Token");
            if (!token || !vocabularyId) {
                return [];
            }

            await wordsService.delete(vocabularyId, token);
            return await get(studentId);
        }
    }
}