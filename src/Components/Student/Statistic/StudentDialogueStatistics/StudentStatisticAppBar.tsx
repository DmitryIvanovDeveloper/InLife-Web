import { AppBar, Box, Toolbar, IconButton, Grid, Badge, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useStudents } from "../../../../Data/useStudents";
import IStudentModel from "../../../../ThereGame.Business/Models/IStudentModel";
import { useLocation } from "react-router-dom";

export default function StudentStatisticAppBar() {
    const location = useLocation();

    const [students, setStudents] = useStudents();
    const [student, setStudent] = useState<IStudentModel>();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        var expectedStudent = students.find(student => student.id == query.get("id"))
        setStudent(expectedStudent);
    }, []);

    return (
        <AppBar position="static" variant='outlined'>
        <Box display='flex' justifyContent='flex-end'>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                >
                </IconButton>

            </Toolbar>
        </Box>
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Avatar
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                    src={student?.avatar}
                ></Avatar>
            </Badge>

            <Typography variant="h6">
                {student?.name}&nbsp;{student?.lastName}
            </Typography>

            <Typography color="text.secondary">{student?.email}</Typography>
        </Grid>

    </AppBar>
    )
}
