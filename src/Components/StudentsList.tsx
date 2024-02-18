import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useStudents } from "../Data/useStudents";
import { Locations } from "../Data/Locations";
import { useState } from "react";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import StudentDialogueStatistics from "./Statistic/StudentDialogueStatistics/StudentDialogueStatistics";

export default function StudentList() {
    const [students, setStudent] = useStudents();
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");
    const[_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const onSelect = (selectedStudentId: string) => {
        console.log();
        setSelectedStudentId(selectedStudentId);
        // setDialogueItemConstructor(() => <StudentDialogueStatistics />);
    }

    return (
        <List dense sx={{ 
            maxHeight: "100%", 
            width: '100%', 
            bgcolor: 'background.paper' , 
            overflow: 'auto' 
        }}>
            <ListItem
                disablePadding
                
            >
                <Box display='flex' flexDirection='column' width='100%'>
                    {students
                    .filter(student => !selectedStudentId ? student : student.id == selectedStudentId)
                    .map((student) => (
                        <ListItemButton 
                            onClick={() => onSelect(student.id)}
                            sx={{ borderRadius: 2}}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{margin: 0, height: 50, width: 50}}
                                    src={student.avatar}
                                />
                            </ListItemAvatar>
                            <ListItemText sx={{ml: 2}} id={student.id} primary={`${student.name} ${student.lastName}`} />
                        </ListItemButton>
                    ))}
                </Box>
            </ListItem>
            
            {selectedStudentId
                ? <StudentDialogueStatistics studentId={selectedStudentId}/>
                : null
            }
            
        </List>
    )
}