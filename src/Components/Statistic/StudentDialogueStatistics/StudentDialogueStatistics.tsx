import DialoguesStatisticFilter from "./DialoguesStatisticFilter";

export interface IStudentDialogueStatisticsProps {
    studentId: string;
}
export default function StudentDialogueStatistics(props: IStudentDialogueStatisticsProps) {
    return (
        <DialoguesStatisticFilter studentId={props.studentId} />
    )
}