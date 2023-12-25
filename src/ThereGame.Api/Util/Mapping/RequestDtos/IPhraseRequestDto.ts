import IAnswerRequestDto from "./IAnswerRequestDto";

export default interface IPhraseRequestDto {
    readonly parentAnswerId: string | null
    readonly id: string
    readonly text: string;
    readonly answers: IAnswerRequestDto[];
    readonly tensesList: string[];
    readonly comments: string;
    readonly audioGenerationSettings: string;
}