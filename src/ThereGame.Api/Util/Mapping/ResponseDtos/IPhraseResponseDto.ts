import IAudioSettings from "../../../../ThereGame.Business/Models/IAudioSettings";
import IAnswerResponseDto from "./IAnswerResponseDto";

export default interface IPhraseResponseDto {
    readonly parentAnswerId: string
    readonly id: string
    readonly text: string;
    readonly answers: IAnswerResponseDto[];
    readonly tensesList: string[];
    readonly comments: string;
    readonly audioSettings: IAudioSettings;
}