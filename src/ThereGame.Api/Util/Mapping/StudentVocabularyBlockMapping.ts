import IQuizleGameStatisticModel from "../../../ThereGame.Business/Models/IQuizleGameStatistic";
import IStudentVocabularyBlockModel from "../../../ThereGame.Business/Models/IStudentVocabularyBlock";
import ITranslateWordsGameStatistic from "../../../ThereGame.Business/Models/ITranslateWordsGameStatistic";
import IStudentVocabularyBlocksDto, { IQuizleGameStatisticDto, ITranslateWordGameStatisticDto } from "../../../ThereGame.Infrastructure/Services/Dto/IStudentVocabularyBlocksDto";

export default class StudentVocabularyBlockMapping {
    
    public request(studentVocabularyBlock: IStudentVocabularyBlockModel): IStudentVocabularyBlocksDto {
        return {
            id: studentVocabularyBlock.id,
            studentId: studentVocabularyBlock.studentId,
            dialogueId: studentVocabularyBlock.dialogueId,
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
                dialogueId: sv.dialogueId,
                wordsId: sv.wordsId,
                createdAt: sv.createdAt,
                quizlGameStatistics: this.mapQuizlGameStatistic(sv.quizlGameStatistics ?? []),
                translateWordsGameStatistics: this.mapTranslateWordsGameStatistic(sv.translateWordsGameStatistics ?? []),
                buildWordsGameStatistics: this.mapBuildWordsGameStatistic(sv.buildWordsGameStatistics ?? [])
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
    private mapTranslateWordsGameStatistic(statisticsDto: ITranslateWordGameStatisticDto[]): ITranslateWordsGameStatistic[] {
        return statisticsDto.map(statisticDto => {
            return {
                id: statisticDto.id,
                wordId: statisticDto.wordId,
                answers: statisticDto.answers,
                createdAt: statisticDto.createdAt,
                vocabularyBlockId: statisticDto.vocabularyBlockId,
            }
        })
    }
    private mapBuildWordsGameStatistic(statisticsDto: ITranslateWordGameStatisticDto[]): ITranslateWordsGameStatistic[] {
        return statisticsDto.map(statisticDto => {
            return {
                id: statisticDto.id,
                wordId: statisticDto.wordId,
                answers: statisticDto.answers,
                createdAt: statisticDto.createdAt,
                vocabularyBlockId: statisticDto.vocabularyBlockId,
            }
        })
    }
}

