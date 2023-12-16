import IAnswerResponseDto from "./IAnswerResponseDto";

export default interface IPhraseResponseDto {
    readonly parentAnswerId: string
    readonly id: string
    readonly text: string;
    readonly answers: IAnswerResponseDto[];
    readonly tenseses: string[];
    readonly comments: string;
}