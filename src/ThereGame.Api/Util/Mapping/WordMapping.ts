import IWordModel from "../../../ThereGame.Business/Models/IWordModel"
import IWordDto, { IWordRequestDto } from "../../../ThereGame.Infrastructure/Services/Dto/IWordDto"

export default class WordMapping {

    public response(wordsDto: IWordDto[]): IWordModel[] {
        return wordsDto.map(wordDto => {
            return {
                id: wordDto.id,
                word: wordDto.word,
                speechParts: wordDto.speechParts,
                pictures: wordDto.pictures,
                forms: wordDto.forms,
                quizlGamesId: wordDto.quizlGamesId,
                wordTranslates: wordDto.translates.map(translateDto => {
                    return {
                        id: translateDto.id,
                        wordId: translateDto.wordId,
                        language: translateDto.language,
                        translates: translateDto.translates,
                    }
                })
            }
        })
    }
    public request(wordDto: IWordModel): IWordRequestDto {
        return {
            id: wordDto.id,
            word: wordDto.word,
            speechParts: wordDto.speechParts,
            pictures: wordDto.pictures,
            forms: wordDto.forms,
            quizlGamesId: wordDto.quizlGamesId,
            translatesData: wordDto.wordTranslates.map(translateDto => {
                return {
                    id: translateDto.id,
                    wordId: translateDto.wordId,
                    language: translateDto.language,
                    translates: translateDto.translates,
                }
            })
        }
    }
}