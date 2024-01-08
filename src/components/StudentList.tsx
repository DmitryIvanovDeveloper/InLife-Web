import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Box, Grid, Card, Switch, Avatar, Typography } from '@mui/material';
import { useStudents } from '../Data/useStudents';
import DevidedLabel from './Headers/DevidedLabel';
import Switcher from './Buttons/Switcher';
import StudentCard from './Student/Student';


export interface IStudentListProps {
    studentList: string[]
    setStudentList: (studentList: string[]) => void
}

export default function StudentList(props: IStudentListProps) {
    const [selectedStudentsId, setSelectedStudentsId] = useState<string[]>(props.studentList);
    const [students, _] = useStudents();

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
        <Box sx={{ borderRadius: 2, paddingTop: "20px", paddingBottom: "20px", justifyContent: 'center' }}>
            <DevidedLabel name="Student Access" />
            <Grid display='flex' flexDirection='row'>
                <Button fullWidth onClick={selectAll}>Select all</Button>
                <Button fullWidth onClick={unselectAll}>Unselect all</Button>
            </Grid>
            <Grid>
                {students.map(student => (
                    <Card
                        sx={{ p: 2 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: "30%"
                        }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-end', width: "100%" }}
                        >
                            <Switch
                                value={student.id}
                                checked={selectedStudentsId.includes(student.id)}
                                onClick={onClick}>
                            </Switch>
                        </Box>

                        <Avatar sx={{ m: 1 }} src={student.avatar} />
                        <Typography>{student?.name}&nbsp;{student?.lastName}</Typography>
                        <Typography>{student.email}</Typography>

                    </Card>
                    // <Button
                    //     variant={selectedStudentsId.includes(student.id) ? "contained" : "outlined"}
                    //     style={{ margin: "5px", fontWeight: 700 }}
                    //     value={student.id}
                    //     onClick={OnClick}>{student.email}
                    // </Button>
                ))}
            </Grid>

        </Box>

    );
}


