import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "../Routes";

export interface IAppBarCustomProps {
    name: string;
}
export default function AppBarCustom(props: IAppBarCustomProps) {
    const navigate = useNavigate();

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
                        {props.name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}