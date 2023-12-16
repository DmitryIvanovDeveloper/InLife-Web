import IMistakeExplanationError from "./IMistakeExplanationError";
import ITranslateError from "./ITranslateError";

export default interface IAnswerError {
    text: boolean,
    wordsToUse: boolean,
    translates: ITranslateError[],
    explanations: IMistakeExplanationError[]
}