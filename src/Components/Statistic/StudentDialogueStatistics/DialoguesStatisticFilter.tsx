import { Box, Tab, Tabs } from "@mui/material";
import StudentCalendarActivity from "./StudentCalendarActivity/StudentCalendarActivity";
import { useDialogues } from "../../../Data/useDialogues";
import IStudentDialogueStatisticModel from "../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";

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
            <Tabs
                value={props.selectedDialogueId}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                {getUnique(props.dialoguesStatisticByDate, "dialogueId").map(dialogueStatistic => (
                    <Tab
                        value={dialogueStatistic.dialogueId}
                        onClick={() => props.setSelectedDialogueId(dialogueStatistic.dialogueId)}
                        label={dialogues.find(dialogue => dialogue.id == dialogueStatistic.dialogueId)?.name}
                    >
                    </Tab>
                ))}
            </Tabs>

        </Box>
    )
}

function getUnique(array, key): IStudentDialogueStatisticModel[] {
    if (typeof key !== 'function') {
        const property = key;
        key = function (item) { return item[property]; };
    }
    return Array.from(array.reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
    }, new Map()).values());
}
