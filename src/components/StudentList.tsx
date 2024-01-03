import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { useStudents } from '../Data/useStudents';
import IStudentModel from '../ThereGame.Business/Models/IStudentModel';


export interface IStudentListProps {
    studentList: string[]
    setStudentList: (studentList: string[]) => void
}

export default function StudentList(props: IStudentListProps) {
    const [clickedButtons, setClickedButtons] = useState<string[]>(props.studentList);
    const [students, _] = useStudents();

    function OnClick(event: any) {
        var index = clickedButtons?.indexOf(event.target.value);
        if (index <= -1) {
            var newClickedButtons = [...clickedButtons, event.target.value];
            setClickedButtons(newClickedButtons);
            props.setStudentList(newClickedButtons);
            return;
        }

        var studentsList = clickedButtons.filter(button => button != event.target.value)
        setClickedButtons(studentsList);
        props.setStudentList(studentsList);

    }

    useEffect(() => {
        setClickedButtons(props.studentList);
    }, [props.studentList]);

    return (
        <Box sx={{ borderRadius: 2, paddingTop: "20px", paddingBottom: "20px", justifyContent: 'center' }}>
            {students.map(student => (
                <Button
                    // variant={!clickedButtons.find(button => button == student) ? "outlined" : "contained"}
                    style={{ margin: "5px", fontWeight: 700 }}
                    value={student.id}
                    onClick={OnClick}>{student.email}
                </Button>
            ))}
        </Box>

    );
}


