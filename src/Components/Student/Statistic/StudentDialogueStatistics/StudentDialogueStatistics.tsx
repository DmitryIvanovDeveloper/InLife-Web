//@ts-nocheck
import { useEffect, useState } from "react"
import { Box } from "@mui/material";
import DialogueChat from "./DialogueChat";
import SplitPane from "react-split-pane";
import { useDialoguesStatistic } from "../../../../Data/useDialogueStatistic";
import IStudentDialogueStatisticModel from "../../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";
import StudentStatisticAppBar from "../StudentStatisticAppBar";
import { isDateSame } from "../../../../ThereGame.Infrastructure/Helpers/DatesCompare";
import DialoguesStatisticFilter from "./DialoguesStatisticFilter";

export default function StudentDialogueStatistics() {
    const [date, onChangeDate] = useState<Date>(new Date());
    const [dialoguesStatistics, _] = useDialoguesStatistic();
    const [selectedDialogueId, setSelectedDialogueId] = useState<string>("");
    const [dialoguesStatisticByDate, setDialoguesStatisticByDate] = useState<IStudentDialogueStatisticModel[]>([]);

    useEffect(() => {
        var dialogueStatisticsByDate = dialoguesStatistics
            .filter(dialogueStatistic => isDateSame(dialogueStatistic.startDate, date as Date))
        ;
        setDialoguesStatisticByDate(dialogueStatisticsByDate);
        setSelectedDialogueId("");
    }, [date]);

    return (
        <Box>
            <StudentStatisticAppBar />

            <SplitPane split="vertical" minSize={250} defaultSize={window.innerWidth / 2} maxSize={window.innerWidth / 2}>
               <DialoguesStatisticFilter 
                    setSelectedDialogueId={setSelectedDialogueId}
                    onChangeDate={onChangeDate}
                    date={date}
                    dialoguesStatisticByDate={dialoguesStatisticByDate}
                    selectedDialogueId={selectedDialogueId}
               />
                {!!dialoguesStatisticByDate?.length && !!selectedDialogueId
                    ? <DialogueChat dialogueStatisticByDate={dialoguesStatisticByDate} dialogueStatisticId={selectedDialogueId}/>
                    : null
                }
            </SplitPane>
        </Box >
    )
}