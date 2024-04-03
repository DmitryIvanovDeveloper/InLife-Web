import { appContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import IVocabularyBlockService from "../../ThereGame.Business/Domain/Util/Services/IVocabularyBlockService";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";
import IStudentVocabularyBlockModel from "../../ThereGame.Business/Models/IStudentVocabularyBlock";
import StudentVocabularyBlockMapping from "../Util/Mapping/StudentVocabularyBlockMapping";
import ICreateStudentVocabularyBlockDto from "../../ThereGame.Infrastructure/Services/Dto/ICreateStudentVocabularyBlockDto";
import { v4 as uuidv4 } from 'uuid';
import { useVocabularyBlockState } from "../../Data/useVocabularyBlocks";

export default function useVocabularyBlockQueriesApi() {

    const vocabularyBlockService = appContainer.get<IVocabularyBlockService>(TYPES.VocabularyBlockService);

    const  [_, setVocabularyBlockState] = useVocabularyBlockState();

    const get = async (studentId: string): Promise<void[]> => {
        var token = localStorage.getItem("Token");
        if (!token || !studentId) {
            return [];
        }

        const result = await vocabularyBlockService.get(token, studentId);
     

        if (result.status == Status.OK) {

            const vocabularyBlocks = new StudentVocabularyBlockMapping().response(result.data);
            setVocabularyBlockState(sortByDate(vocabularyBlocks));
        }
        if (result.status == Status.NoContent) {
            setVocabularyBlockState([]);
        }

        return []
    }

    return {
        update: async (studentVocabularyBlock: IStudentVocabularyBlockModel): Promise<void> => {
            var token = localStorage.getItem("Token");
            if (!token) {
                return;
            }

            const studentVocabularyRequest = new StudentVocabularyBlockMapping().request(studentVocabularyBlock);

            await vocabularyBlockService.update(studentVocabularyRequest, token);
            await get(studentVocabularyBlock.studentId);

        },

        get: async (studentId: string): Promise<void> => {
            await get(studentId);
        },

        create: async (studentId: string, blocksLength?: number, dialogueId?: string, wordsId?: string[]): Promise<void> => {
            var token = localStorage.getItem("Token");
            if (!token || !studentId) {
                return;
            }

            const dto: ICreateStudentVocabularyBlockDto = {
                id: uuidv4(),
                studentId: studentId,
                dialogueId: dialogueId ?? '00000000-0000-0000-0000-000000000000',
                order: 0,
                name: `Block ${blocksLength ?? 0 + 1}`,
                wordsId: wordsId ?? []
            }

            await vocabularyBlockService.create(dto, token);

            await get(studentId);
        },
        delete: async (vocabularyId: string, studentId: string): Promise<void> => {

            var token = localStorage.getItem("Token");
            if (!token || !vocabularyId) {
                return;
            }

            await vocabularyBlockService.delete(vocabularyId, token);
            await get(studentId);
        }
    }
}

const sortByDate = (vocabularyBlocks: IStudentVocabularyBlockModel[]): IStudentVocabularyBlockModel[] => {
    if (!vocabularyBlocks.length) {
        return vocabularyBlocks;
    }
    return vocabularyBlocks.sort((a, b) => {
        return new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
    })
}