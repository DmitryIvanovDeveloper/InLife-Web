import { Box, Button } from "@mui/material";
import StudentCalendarActivity from "./StudentCalendarActivity/StudentCalendarActivity";
import IDialogueStatistic from "../../../../ThereGame.Business/Models/IDialogueStatistic";
import { useDialogues } from "../../../../Data/useDialogues";

export interface IDialoguesStatisticFilterProps {
    setSelectedDialogueId: (dialogueId: string) => void;
    onChangeDate: (date: Date) => void;
    date: Date;
    dialoguesStatisticByDate: IDialogueStatistic[];
    selectedDialogueId: string;
}
export default function DialoguesStatisticFilter(props: IDialoguesStatisticFilterProps) {
    const [dialogues, _] = useDialogues();

    return (
        <Box>
            <StudentCalendarActivity onChange={props.onChangeDate} date={props.date} />
            {props.dialoguesStatisticByDate.map(dialogueStatistic => (
                <Button
                    variant={dialogueStatistic.id == props.selectedDialogueId ? "contained" : "outlined"}
                    onClick={() => props.setSelectedDialogueId(dialogueStatistic.id)}
                >
                    {dialogues.find(dialogue => dialogue.id == dialogueStatistic.id)?.name}
                </Button>
            ))}
        </Box>
    )
}