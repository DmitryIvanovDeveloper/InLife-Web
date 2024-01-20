import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Routes';
import Profile from '../Profile/Profile';

export interface IMenuAppBarProps {
    teacherId: string;
}
export default function MenuAppBar(props: IMenuAppBarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigation = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);

    };

    const editProfile = () => {
        navigation(Routes.teacherProfileEditor)
    }

    const logout = () => {
        localStorage.removeItem("[Teacher] - Token")
        navigation(Routes.signInTeacher)
        handleClose();
    }

    return (
        <Box sx={{ flexGrow: 1 }}
            display='flex'
        >
            <AppBar position="static" variant='outlined'>
                <Box display='flex' justifyContent='flex-end'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </Box>
                
                <Profile />
            </AppBar>
        </Box>
    );
}