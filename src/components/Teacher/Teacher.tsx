// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import React from "react";
import { useUser } from "../../Data/useUser";
import { useNavigate } from "react-router-dom";
import CopyToClipboardButton from "../CopyToClipboard/CopyToClipboard";

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

//APP
export default function Teacher(props: any) {
    const [user] = useUser();
    const navigate = useNavigate();

    return (
        <Card variant="outlined">
            <Grid item style={styles.details} sx={{ width: "100%" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "99%", p: 1, my: 2 }}
                    onClick={() => navigate("/builder")}
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
                        {user?.name}&nbsp;{user?.lastName}
                    </Typography>
                    <Typography color="text.secondary">{user?.email}</Typography>
                </Grid>

                <CopyToClipboardButton link={`http://localhost:3000/auth/sign-up/student?id=${user?.id}`} />

                <Grid container>
                    <Typography style={styles.value}>Students</Typography>
                    <Grid >
                        {user?.students.map(student => (
                            <Button>{student.email}</Button>
                        ))}
                    </Grid>
                </Grid>

                <Grid container>
                    <Typography style={styles.value}>Dialogues</Typography>

                    <Grid item xs={6}>
                        {user?.dialogues.map(dialogue => (
                            <Button>{dialogue.name}</Button>
                        ))}

                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "end" }} />

                </Grid>

            </Grid>
        </Card>
    );
}
