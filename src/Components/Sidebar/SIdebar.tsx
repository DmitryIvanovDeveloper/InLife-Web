import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { ReactElement, useEffect, useState } from 'react';
import UserMenuAppBar from '../AppBars/UserMenuAppBar';
import { useConstructorActionsState } from '../../Data/useConstructorActionsState';
import { useDialogueItemConstructor } from '../../Data/useDialogues';

const drawerWidth = 500;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export interface IMiniDrawerProps {
    barElements: ReactElement
    elements: ReactElement | null
}

export default function MiniDrawer(props: IMiniDrawerProps) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState<ReactElement | null>();
    const [actionState] = useConstructorActionsState();
    const [itemConstructor] = useDialogueItemConstructor();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setCurrentComponent(props.elements)
    }, [actionState.selectedStudentId]);

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        }, 500)
    }, []);

    return (
        <Box sx={{ overflow: 'hidden' }}>

            <AppBar sx={{ overflow: 'hidden' }} position="absolute" open={open} >
                <Toolbar sx={{ overflow: 'hidden' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >

                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ overflow: 'hidden' }} width="100%" display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant="h6" noWrap>
                            Scenario
                        </Typography>
                        <UserMenuAppBar />
                    </Box>

                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl'
                            ? <ChevronRightIcon />
                            : <ChevronLeftIcon />
                        }

                    </IconButton>
                </DrawerHeader>
                <Divider />
                {open ? props.barElements : null}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, filter: open ? "blur(0px)" : "none", overflow: 'hidden', position: 'relative' }}>
                {!!actionState.selectedNpc.scenarioId
                    ? <Box>
                        {props.elements}
                    </Box>
                    : null
                }
                {!!actionState.selectedStudentId
                    ? itemConstructor
                    : null
                }
            </Box>
        </Box>
    );
}