import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import DeleteButton from "./buttons/DeleteButton";

export interface IAppBarCustomProps{
    name: string;
}
export default function AppBarCustom(props: IAppBarCustomProps) {
    return (
        <Box sx={{ flexGrow: 1, display: "flex" }}>
            <AppBar position="static" sx={{ borderRadius: 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                    >
                    </IconButton>
                    <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1}}>
                        {props.name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}