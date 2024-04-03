import { Avatar, Box, Button, Card, Checkbox, Fab, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStudents } from '../Data/useStudents';

export interface IStudentListProps {
    accessStudentList: string[]
    setAccessStudentList: (studentList: string[]) => void;
}

export default function AcessStudentList(props: IStudentListProps) {
    const [selectedStudentsId, setSelectedStudentsId] = useState<string[]>(props.accessStudentList);
    const [students, _] = useStudents();

    function onClick(event: any) {
        var index = selectedStudentsId?.indexOf(event.target.value);
        if (index <= -1) {
            var newClickedButtons = [...selectedStudentsId, event.target.value];
            setSelectedStudentsId(newClickedButtons);
            props.setAccessStudentList(newClickedButtons);
            return;
        }

        var studentsList = selectedStudentsId.filter(button => button != event.target.value)
        setSelectedStudentsId(studentsList);
        props.setAccessStudentList(studentsList);
    }

    useEffect(() => {
        setSelectedStudentsId(props.accessStudentList);
    }, [props.accessStudentList]);

    function selectAll() {
        var studentsId = students.map(student => student.id);
        setSelectedStudentsId(studentsId);
        props.setAccessStudentList(studentsId);
    }

    function unselectAll() {

        setSelectedStudentsId([]);
        props.setAccessStudentList([]);
    }  
    
    const hasAccess = (id: string): boolean => {
        return props.accessStudentList.find(accessStudentId => accessStudentId == id) != null;
    }

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <List dense sx={{ height: "100%", width: '100%', bgcolor: 'background.paper' }}>
                {students
                    .map((student) => {
                        const labelId = `checkbox-list-secondary-label-${student.id}`;
                        return (
                            <ListItem
                                key={student.id}
                                disablePadding
                            >
                                <ListItemButton
                                    sx={{ borderRadius: 2 }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={student.avatar}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${student.name} ${student.lastName}`} />

                                    <Switch 
                                        edge='end' 
                                        onClick={onClick} 
                                        checked={hasAccess(student.id)} 
                                        value={student.id}
                                    />

                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>
        </Box>
    );
}


