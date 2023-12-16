import ITranslateModel from "../../../ThereGame.Business/Models/ITranslateModel";
import ITranslateResponseDto from "./ResponseDtos/ITranslateResponseDto";

export default class TranslateMapping {

    public response(translate: ITranslateResponseDto): ITranslateModel {
        return {
            parentId: translate.answerParentId,
            id: translate.id,
            language: translate.language,
            text: translate.text
        }
    }

    public request(translate: ITranslateModel): ITranslateResponseDto {
        return {
            answerParentId: translate.parentId,
            id: translate.id,
            language: translate.language,
            text: translate.text
        }
    }
}