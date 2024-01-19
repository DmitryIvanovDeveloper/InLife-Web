import { Avatar, Badge, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useTeacher } from "../../Data/useTeacher";

export default function Profile() {

    const [teacher] = useTeacher();

    if (!teacher) {
        return (
            <Box display='flex' justifyContent='center' height='1000vh'>
                <CircularProgress />
            </Box>)
    }
    
    return (
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Avatar
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                    src={teacher?.avatar}
                ></Avatar>
            </Badge>

            <Typography variant="h6">
                {teacher?.name}&nbsp;{teacher?.lastName}
            </Typography>

            <Typography color="text.secondary">{teacher?.email}</Typography>
        </Grid>
    )
}