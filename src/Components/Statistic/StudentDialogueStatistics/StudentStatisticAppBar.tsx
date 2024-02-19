import { AppBar, Box, Toolbar, IconButton, Grid, Badge, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useStudents } from "../../../Data/useStudents";
import IStudentModel from "../../../ThereGame.Business/Models/IStudentModel";
import { useLocation, useNavigate } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Routes } from "../../../Routes";

export default function StudentStatisticAppBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [students, setStudents] = useStudents();
    const [student, setStudent] = useState<IStudentModel>();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        var expectedStudent = students.find(student => student.id == query.get("id"))
        setStudent(expectedStudent);
    }, []);

    return (
        <Box sx={{ flexGrow: 1, display: "flex", maxHeight: "60px" }}>

            <AppBar position="static" sx={{ borderRadius: 1 }}>

                <Toolbar>
                    <IconButton onClick={() => navigate(Routes.main)}>
                        <HomeRoundedIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>

                    <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1, pr: 3 }}>
                        Dialogues statistic
                    </Typography>
                    <Typography>{student?.name}&nbsp;{student?.lastName}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
