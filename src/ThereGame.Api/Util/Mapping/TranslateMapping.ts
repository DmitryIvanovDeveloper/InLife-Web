import ITranslateModel from "../../../ThereGame.Business/Models/ITranslateModel";
import ITranslateDto from "./ITranslateDto";

export default class TranslateMapping {

    public response(translate: ITranslateDto): ITranslateModel {
        return {
            parentId: translate.answerParentId,
            id: translate.id,
            language: translate.language,
            text: translate.text
        }
    }

    public request(translate: ITranslateModel): ITranslateDto {
        return {
            answerParentId: translate.parentId,
            id: translate.id,
            language: translate.language,
            text: translate.text
        }
    }
}