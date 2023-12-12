import IAnswerDto from "./IAnswerDto";
import IAnswerModel from "./IAnswerDto";

export default interface IPhraseDto {
    readonly parentAnswerId: string
    readonly id: string
    readonly text: string;
    readonly answers: IAnswerDto[];
    readonly tensesList: string[];
    readonly comments: string;
}