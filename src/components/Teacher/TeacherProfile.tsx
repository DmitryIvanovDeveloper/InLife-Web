// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Grid, LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useTeacher } from "../../Data/useTeacher";
import { useNavigate } from "react-router-dom";
import CopyToClipboardButton from "../CopyToClipboard/CopyToClipboard";
import Student from "../Student/Student";
import MenuAppBar from "../AppBars/MenuAppBar";
import { Routes } from "../../Routes";
import useTeacherQueriesApi from "../../ThereGame.Api/Queries/TeacherQueriesApi";

// STYLES
const styles = {
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1"
    },
    value: {
        padding: "1rem 2rem",
        borderTop: "1px solid #e1e1e1",
        color: "#899499"
    }
};

export default function TeacherProfile(props: any) {
    const [teacher] = useTeacher();
    const navigate = useNavigate();
    const teacherQueriesApi = useTeacherQueriesApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        teacherQueriesApi.getById()
            .then(status => {
                setIsLoading(false);
            });
    }, []);
    
    if (isLoading) {
        return <Box 
            display='flex' 
            justifyContent='center'
        >
            <LinearProgress />
        </Box>
    }
    
    return (
        <Card variant="outlined">
            <MenuAppBar />

            <Grid item style={styles.details} sx={{ width: "100%" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "99%", p: 1, my: 2 }}
                    onClick={() => navigate(Routes.dialoguesBuilder)}
                >
                    Dialogues Buider
                </Button>
            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <PhotoCameraIcon
                                sx={{
                                    border: "5px solid white",
                                    backgroundColor: "#ff558f",
                                    borderRadius: "50%",
                                    padding: ".2rem",
                                    width: 35,
                                    height: 35
                                }}
                            ></PhotoCameraIcon>
                        }
                    >
                        <Avatar
                            sx={{ width: 100, height: 100, mb: 1.5 }}
                            src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
                        ></Avatar>
                    </Badge>

                    <Typography variant="h6">
                        {teacher?.name}&nbsp;{teacher?.lastName}
                    </Typography>
                    <Typography color="text.secondary">{teacher?.email}</Typography>
                </Grid>

                <CopyToClipboardButton link={`http://localhost:3000/auth/sign-up/student?id=${teacher?.id}`} />

                <Typography style={styles.value}>Students [{teacher?.students.length}]</Typography>
                <Grid container>
                    <Grid
                        display='flex'
                        justifyContent='space-between'
                    >
                        {teacher?.students.map(student => (
                            <Student student={student} />
                        ))}
                    </Grid>
                </Grid>

                <Typography style={styles.value}>Dialogues [{teacher?.dialogues.length}]</Typography>

                <Grid container>

                    <Grid item xs={6}>
                        {teacher?.dialogues.map(dialogue => (
                            <Typography>{dialogue.name}</Typography>
                        ))}
                    </Grid>
                </Grid>

            </Grid>
        </Card>
    );
}
