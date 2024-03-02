import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Routes';
import { Avatar, Typography } from '@mui/material';
import { useTeacher } from '../../Data/useTeacher';

export interface IMenuAppBarProps {
}
export default function UserMenuAppBar(props: IMenuAppBarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigation = useNavigate();
    const [teacher] = useTeacher()

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
        localStorage.removeItem("Token")
        navigation(Routes.signIn)
        handleClose();
    }

    return (
            <Box display='flex' alignItems='center'>
                <Typography variant="h6" noWrap>{`${teacher?.name} ${teacher?.lastName}`}</Typography>

                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
                       <Avatar src={teacher?.avatar}/>
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
            </Box>
    );
}