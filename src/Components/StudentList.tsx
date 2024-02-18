import { Avatar, Box, Button, Card, Checkbox, Fab, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStudents } from '../Data/useStudents';
import AddButton from './Button/AddButton';
import Icon from '@mui/material/Icon';

export interface IStudentListProps {
    studentList: string[]
    setStudentList: (studentList: string[]) => void
}

export default function StudentList1(props: IStudentListProps) {
    const [selectedStudentsId, setSelectedStudentsId] = useState<string[]>(props.studentList);
    const [students, _] = useStudents();

    const [checked, setChecked] = useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function onClick(event: any) {
        var index = selectedStudentsId?.indexOf(event.target.value);
        if (index <= -1) {
            var newClickedButtons = [...selectedStudentsId, event.target.value];
            setSelectedStudentsId(newClickedButtons);
            props.setStudentList(newClickedButtons);
            return;
        }

        var studentsList = selectedStudentsId.filter(button => button != event.target.value)
        setSelectedStudentsId(studentsList);
        props.setStudentList(studentsList);

    }

    useEffect(() => {
        setSelectedStudentsId(props.studentList);
    }, [props.studentList]);

    function selectAll() {
        var studentsId = students.map(student => student.id);
        setSelectedStudentsId(studentsId);
        props.setStudentList(studentsId);
    }

    function unselectAll() {

        setSelectedStudentsId([]);
        props.setStudentList([]);
    }

    return (
        <Box sx={{height: "100%", width: "100%" }}>
            <List dense sx={{ height: "100%" , width: '100%', bgcolor: 'background.paper' }}>
                {students
                    .map((student) => {
                        const labelId = `checkbox-list-secondary-label-${student.id}`;
                        return (
                            <ListItem
                                key={student.id}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={student.avatar}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${student.name} ${student.lastName}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
            </List>

           
        </Box>


    );
}


