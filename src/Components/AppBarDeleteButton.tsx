import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import DeleteButton from "./Button/DeleteButton";

export interface IAppBarDeleteButtonProps{
    name: string;
}
export default function AppBarDeleteButton(props: IAppBarDeleteButtonProps) {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", maxHeight: "60px" }}>
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