import IQuizleGameStatisticModel from "../../../ThereGame.Business/Models/IQuizleGameStatistic";
import IStudentVocabularyBlockModel from "../../../ThereGame.Business/Models/IStudentVocabularyBlock";
import IStudentVocabularyBlocksDto, { IQuizleGameStatisticDto } from "../../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto";

export default class StudentVocabularyBlockMapping {
    
    public request(studentVocabularyBlock: IStudentVocabularyBlockModel): IStudentVocabularyBlocksDto {
        return {
            id: studentVocabularyBlock.id,
            studentId: studentVocabularyBlock.studentId,
            name: studentVocabularyBlock.name,
            wordsId: studentVocabularyBlock.wordsId,
            createdAt: studentVocabularyBlock.createdAt,
        }
    }
    public response(studentVocabularyBlocks: IStudentVocabularyBlocksDto[]): IStudentVocabularyBlockModel[] {
        return studentVocabularyBlocks.map(sv => {
            return {
                id: sv.id,
                studentId: sv.studentId,
                name: sv.name,
                wordsId: sv.wordsId,
                createdAt: sv.createdAt,
                quizlGameStatistics: this.mapQuizlGameStatistic(sv.quizlGameStatistics ?? [])
            }
        })
    }

    private mapQuizlGameStatistic(statisticsDto: IQuizleGameStatisticDto[]): IQuizleGameStatisticModel[] {
        return statisticsDto.map(statisticDto => {
            return {
                id: statisticDto.id,
                quizlGameId: statisticDto.quizlGameId,
                answers: statisticDto.answers,
                createdAt: statisticDto.createdAt,
                vocabularyBlockId: statisticDto.vocabularyBlockId,
            }
        })
    }
}

