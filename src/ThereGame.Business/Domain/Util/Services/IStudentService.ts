import ICreateStudentVocabularyBlockDto from "../../../../ThereGame.Infrastructure/Services/Dto/ICreateStudentVocabularyBlockDto";
import IStudentVocabularyBlocksDto from "../../../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IStudentService {
    updateVocabularyBlock(request: IStudentVocabularyBlocksDto, id: string): Promise<TypedResult<Status>>
    getVocabularyBlocks(teacherId: string, studemtId: string): Promise<TypedResult<Status>>
    createVocabularyBlocks(dto: ICreateStudentVocabularyBlockDto, teacherId: string): Promise<TypedResult<Status>>
}