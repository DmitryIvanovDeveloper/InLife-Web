import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useStudents } from '../Data/useStudents';
import DevidedLabel from './Headers/DevidedLabel';


export interface IStudentListProps {
    studentList: string[]
    setStudentList: (studentList: string[]) => void
}

export default function StudentList(props: IStudentListProps) {
    const [selectedStudentsId, setSelectedStudentsId] = useState<string[]>(props.studentList);
    const [students, _] = useStudents();

    function OnClick(event: any) {
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
        <Box sx={{ borderRadius: 2, paddingTop: "20px", paddingBottom: "20px", justifyContent: 'center' }}>
            <DevidedLabel name="Student Access"/>
            <Grid display='flex' flexDirection='row'>
                <Button fullWidth onClick={selectAll}>Select all</Button>
                <Button fullWidth onClick={unselectAll}>Unselect all</Button>
            </Grid>
            {students.map(student => (
                <Button
                    variant={selectedStudentsId.includes(student.id) ? "contained" : "outlined"}
                    style={{ margin: "5px", fontWeight: 700 }}
                    value={student.id}
                    onClick={OnClick}>{student.email}
                </Button>
            ))}
        </Box>

    );
}


