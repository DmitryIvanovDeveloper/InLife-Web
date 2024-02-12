import { Box, Button } from "@mui/material";
import StudentCalendarActivity from "./StudentCalendarActivity/StudentCalendarActivity";
import IStudentDialogueStatisticModel from "../../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";
import { useDialogues } from "../../../../Data/useDialogues";
import { useEffect } from "react";

export interface IDialoguesStatisticFilterProps {
    setSelectedDialogueId: (dialogueId: string) => void;
    onChangeDate: (date: Date) => void;
    date: Date;
    dialoguesStatisticByDate: IStudentDialogueStatisticModel[];
    selectedDialogueId: string;
}
export default function DialoguesStatisticFilter(props: IDialoguesStatisticFilterProps) {
    const [dialogues, _] = useDialogues();
    return (
        <Box>
            <StudentCalendarActivity onChange={props.onChangeDate} date={props.date} />
            {getUnique(props.dialoguesStatisticByDate, "dialogueId").map(dialogueStatistic => (
                <Button
                    variant={dialogueStatistic.dialogueId == props.selectedDialogueId ? "contained" : "outlined"}
                    onClick={() => props.setSelectedDialogueId(dialogueStatistic.dialogueId)}
                >
                    {dialogues.find(dialogue => dialogue.id == dialogueStatistic.dialogueId)?.name}
                </Button>
            ))}
        </Box>
    )
}

function getUnique(array, key): IStudentDialogueStatisticModel[] {
    if (typeof key !== 'function') {
      const property = key;
      key = function(item) { return item[property]; };
    }
    return Array.from(array.reduce(function(map, item) {
      const k = key(item);
      if (!map.has(k)) map.set(k, item);
      return map;
    }, new Map()).values());
  }
  