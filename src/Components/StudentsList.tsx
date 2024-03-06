import { Avatar, Box, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useStudents } from "../Data/useStudents";
import { useEffect, useState } from "react";
import StudentDialogueStatistics from "./Statistic/StudentDialogueStatistics/StudentDialogueStatistics";
import CopyToClipboardButton from "./CopyToClipboard/CopyToClipboard";
import { useTeacher } from "../Data/useTeacher";
import { Routes } from "../Routes";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useDialogueStatisticApi from "../ThereGame.Api/Queries/DialogueStatisticApi";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import { useActionData } from "react-router-dom";
import useConstructorActions from "../Data/ConstructorActions";

export default function StudentList() {
    const [teacher] = useTeacher();
    const [students] = useStudents();
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");
    const [dialogueItemConstructor, setDialogueItemConstrucor] = useDialogueItemConstructor();
    const dialogueStatisticApi = useDialogueStatisticApi();
    const [isLoading, setIsLodaing] = useState<boolean>();
    const actions = useConstructorActions();

    useEffect(() => {
        if (!selectedStudentId) {
            return;
        }
        setIsLodaing(true)
        dialogueStatisticApi
            .get(selectedStudentId)
            .then(console.log)
            .finally(() => setIsLodaing(false));
    }, [selectedStudentId]);

    const onSelect = (selectedStudentId: string) => {
        actions.setSelectedStudentId(selectedStudentId)
        setSelectedStudentId(selectedStudentId);
        setDialogueItemConstrucor(<div></div>);
    }

    return (
        <List dense sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto'
        }}>
            <CopyToClipboardButton link={`${window.location.host}${Routes.signUpStudent}?id=${teacher?.id}`} />
            
            <ListItem
                disablePadding
            >
                <Box display='flex' flexDirection='column' width='100%'>

                    {students
                        .filter(student => !selectedStudentId ? student : student.id == selectedStudentId)
                        .map((student) => (
                            <Box display='flex' flexDirection='row' >
                                {!selectedStudentId
                                    ? null
                                    : <IconButton
                                        sx={{
                                            margin: 1
                                        }}
                                        onClick={() => onSelect("")}
                                    >

                                        <ArrowBackIosNewIcon />
                                    </IconButton>

                                }

                                <ListItemButton
                                    onClick={() => onSelect(student.id)}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{ height: 50, width: 50 }}
                                            src={student.avatar}
                                        />
                                    </ListItemAvatar>

                                    <ListItemText sx={{ ml: 2 }} id={student.id} primary={`${student.name} ${student.lastName}`} />
                                </ListItemButton>
                                {isLoading
                                    ? <Box display='flex' justifyContent='center' alignItems='center' marginRight={1}>
                                        <CircularProgress />
                                    </Box>
                                    : null
                                }
                            </Box>

                        ))}
                </Box>
            </ListItem>

            {selectedStudentId
                ? <StudentDialogueStatistics studentId={selectedStudentId} />
                : null
            }

        </List>
    )
}