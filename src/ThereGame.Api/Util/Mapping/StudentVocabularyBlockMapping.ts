import IStudentVocabularyBlockModel from "../../../ThereGame.Business/Models/IStudentVocabularyBlock";
import IStudentVocabularyBlocksDto from "../../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto";

export default class StudentVocabularyBlockMapping {
    
    public request(studentVocabularyBlock: IStudentVocabularyBlockModel): IStudentVocabularyBlocksDto {
        return {
            id: studentVocabularyBlock.id,
            studentId: studentVocabularyBlock.studentId,
            name: studentVocabularyBlock.name,
            wordsId: studentVocabularyBlock.wordsId,
            order: studentVocabularyBlock.order,
        }
    }
    public response(studentVocabularyBlocks: IStudentVocabularyBlocksDto[]): IStudentVocabularyBlockModel[] {
        return studentVocabularyBlocks.map(sv => {
            return {
                id: sv.id,
                studentId: sv.studentId,
                name: sv.name,
                wordsId: sv.wordsId,
                order: sv.order
            }
        })
      
    }
}