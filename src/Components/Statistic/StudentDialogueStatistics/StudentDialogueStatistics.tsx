import { useEffect, useState } from "react"
import { Box, CircularProgress } from "@mui/material";
import { useDialoguesStatistic } from "../../../Data/useDialogueStatistic";
import DialoguesStatisticFilter from "./DialoguesStatisticFilter";
import useDialogueStatisticApi from "../../../ThereGame.Api/Queries/DialogueStatisticApi";
import { useDialogueItemConstructor } from "../../../Data/useDialogues";

export interface IStudentDialogueStatisticsProps {
    studentId: string;
}
export default function StudentDialogueStatistics(props: IStudentDialogueStatisticsProps) {
    const dialogueStatisticApi = useDialogueStatisticApi();
    const [idLoading, setIsLodaing] = useState<boolean>();
    
    useEffect(() => {
        setIsLodaing(true)
        dialogueStatisticApi
            .get(props.studentId)
            .then()
            .finally(() => setIsLodaing(false));
    }, []);

    return (
        <Box>
            {idLoading
                ? <Box display='flex' justifyContent='center'>
                    <CircularProgress />
                </Box>
                : <DialoguesStatisticFilter />
            }
        </Box >
    )
}