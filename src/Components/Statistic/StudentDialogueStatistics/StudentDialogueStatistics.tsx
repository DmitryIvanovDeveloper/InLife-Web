import { useEffect, useState } from "react"
import { Box } from "@mui/material";
import DialogueChat from "./DialogueChat";
import { useDialoguesStatistic } from "../../../Data/useDialogueStatistic";
import IStudentDialogueStatisticModel from "../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";
import { isDateSame } from "../../../ThereGame.Infrastructure/Helpers/DatesCompare";
import DialoguesStatisticFilter from "./DialoguesStatisticFilter";
import useDialogueStatisticApi from "../../../ThereGame.Api/Queries/DialogueStatisticApi";
import { useDialogueItemConstructor } from "../../../Data/useDialogues";

export interface IStudentDialogueStatisticsProps {
    studentId: string;
}
export default function StudentDialogueStatistics(props: IStudentDialogueStatisticsProps) {
    const [date, onChangeDate] = useState<Date>(new Date());
    const [dialoguesStatistics, _] = useDialoguesStatistic();
    const [selectedDialogueId, setSelectedDialogueId] = useState<string>("");
    const [dialoguesStatisticByDate, setDialoguesStatisticByDate] = useState<IStudentDialogueStatisticModel[]>([]);
    const dialogueStatisticApi = useDialogueStatisticApi();
    const [dialogueItemConstructor, setDialogueItemConstructor] = useDialogueItemConstructor();

    useEffect(() => {
        dialogueStatisticApi.get(props.studentId);
    }, []);

    useEffect(() => {
        var dialogueStatisticsByDate = dialoguesStatistics
            .filter(dialogueStatistic => isDateSame(dialogueStatistic.startDate, date as Date));

        setDialoguesStatisticByDate(dialogueStatisticsByDate);
        setSelectedDialogueId("");
        setDialogueItemConstructor(() => <div/>)
    ;
    }, [date]);

    useEffect(() => {
        if (!!dialoguesStatisticByDate?.length && !!selectedDialogueId) {
            setDialogueItemConstructor(() => <DialogueChat
                dialogueStatisticByDate={dialoguesStatisticByDate}
                dialogueStatisticId={selectedDialogueId} />)
            ;
        }
    }, [selectedDialogueId])
    return (
        <Box>
            {/* <StudentStatisticAppBar /> */}

            <DialoguesStatisticFilter
                setSelectedDialogueId={setSelectedDialogueId}
                onChangeDate={onChangeDate}
                date={date}
                dialoguesStatisticByDate={dialoguesStatisticByDate}
                selectedDialogueId={selectedDialogueId}
            />
        </Box >
    )
}