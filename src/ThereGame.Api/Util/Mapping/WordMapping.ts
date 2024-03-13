import ITranslateModel from "../../../ThereGame.Business/Models/ITranslateModel"
import IWordModel, { IWordTrasnalteModel } from "../../../ThereGame.Business/Models/IWordModel"
import IWordResponseDto from "../../../ThereGame.Infrastructure/Services/Dto/IWordDto"

export default class WordMapping {

    public response(wordsDto: IWordResponseDto[]): IWordModel[] {

        return wordsDto.map( wordDto => {
            return {
                id: wordDto.id,
                word: wordDto.word,
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
}