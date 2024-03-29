import ICreateStudentVocabularyBlockDto from "../../../../ThereGame.Infrastructure/Services/Dto/ICreateStudentVocabularyBlockDto";
import IStudentVocabularyBlocksDto from "../../../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto";
import TypedResult from "../../../../ThereGame.Infrastructure/Statuses/Result";
import { Status } from "../../../../ThereGame.Infrastructure/Statuses/Status";

export default interface IVocabularyBlockService {
    delete(vocabularyId: string, token: string): Promise<TypedResult<Status>>;
    update(request: IStudentVocabularyBlocksDto, id: string): Promise<TypedResult<Status>>
    get(teacherId: string, studemtId: string): Promise<TypedResult<Status>>
    create(dto: ICreateStudentVocabularyBlockDto, teacherId: string): Promise<TypedResult<Status>>
}