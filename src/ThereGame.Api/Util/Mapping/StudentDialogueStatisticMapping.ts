import IStudentDialogueStatisticModel, { IDialogueHistory, IStudentAnswer } from "../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";
import IStudentDialogueStatisticResponseDto, { IDialogueHistoryDto } from "./ResponseDtos/IStudentDialogueStatisticResponseDto";

export default class StudentDialogueStatisticMapping {
    public Response(studentDialoguesStatistic: IStudentDialogueStatisticResponseDto[]): IStudentDialogueStatisticModel[] {
        return studentDialoguesStatistic.map(statistic => {
            return {
                dialogueId: statistic.dialogueId,
                studentId: statistic.dialogueId,
                dialogueHistory: this.ResponseDialogueHistories(statistic.dialogueHistory),
                startDate: new Date(statistic.startDate),
                endDate: new Date(statistic.endDate)
            }
        });
    }
    private ResponseDialogueHistories(dialogueHistoriesDto: IDialogueHistoryDto[]): IDialogueHistory[] {
        return dialogueHistoriesDto.map(dialogueHistory => {
            return {
                orderId: dialogueHistory.orderId,
                phraseId: dialogueHistory.phraseId,
                phrase: dialogueHistory.phrase,
                answers: dialogueHistory.answers.map(answer => this.responseAnswers(answer)),
            }
        })
    }
    private responseAnswers(answer: string): IStudentAnswer
    {
        var parsedAnswer = JSON.parse(answer);
        return {
            orderId: parsedAnswer.OrderId,
            text: parsedAnswer.Text
        }
    }
}
