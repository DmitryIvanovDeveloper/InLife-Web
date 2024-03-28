import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Switch, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Switcher from '../Button/Switcher';

export interface IBasicMenuProps {
    onDelete: () => void;
}

export default function BasicMenu(props: IBasicMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onDelete = () => {
        props.onDelete();
        setAnchorEl(null);
    };
    const handle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(null);
    };

    return (
        <Box display='flex' justifyContent='flex-end'>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handle}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={onDelete}>
                    <Typography fontWeight={600} color='#b71c1c'>Delete block</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}