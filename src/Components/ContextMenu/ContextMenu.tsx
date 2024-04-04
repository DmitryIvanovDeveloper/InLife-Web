import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentPaste';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface IMousePosition {
    x: number;
    y: number;
}
export interface IContextMenuProps {
    isWordExist: boolean;
    isSelectedWordExistInVocabularyWords: boolean;
    selecetedWord: string;
    onAddWord: () => void;
    onCreateWord: () => void;
    isLoading: boolean;
}

export default function ContextMenu(props: IContextMenuProps) {

    const [mousePosition, setMousePosition] = useState<IMousePosition>({ x: 0, y: 0 });

    const handleContextMenu = ((event: MouseEvent) => {
        event.preventDefault();

        const leftBoundary = window.innerWidth - event.offsetX;
        const topBoundary = window.innerHeight - event.offsetY;

        let left = event.clientX;
        if (left > leftBoundary) left = leftBoundary + 150;

        let top = event.clientY;
        if (top > topBoundary) top = topBoundary;


        setMousePosition({ x: left, y: top });
    })

    useEffect(() => {
        window.addEventListener('click', handleContextMenu);

        return () => {
            window.removeEventListener(
                'click',
                handleContextMenu
            );
        };
    }, []);

    return (
        <Box
            sx={{
                left: mousePosition.x,
                top: mousePosition.y,
                position: "fixed",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 999,

            }}
        >
            <Paper sx={{
                maxWidth: '100%',
                backdropFilter: "blur(3px)",
                backgroundColor: 'rgba(0,0,30,0.4)',
                color: 'white',
            }}
            >
                <MenuList>
                    {props.isWordExist
                        ? <MenuItem onClick={props.onAddWord}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <PostAddIcon fontSize="small" />
                            </ListItemIcon>
                            {props.isLoading

                                ? <Box display='flex' justifyContent='center' alignItems='center' >
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    >{props.isSelectedWordExistInVocabularyWords
                                        ? `Deleting '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`
                                        : `Adding '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`
                                        }
                                    </Typography>
                                    <CircularProgress size={25}  sx={{color: 'orange', ml: 1,}}/>

                                </Box>
                                : <ListItemText
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600
                                    }}>
                                    {props.isSelectedWordExistInVocabularyWords
                                        ? `Remove '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`
                                        : `Add '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`
                                    }
                                </ListItemText>
                            }

                        </MenuItem>
                        : <MenuItem onClick={props.onCreateWord} >
                            <ListItemIcon sx={{ color: 'white' }}>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    fontWeight: 600
                                }}>
                                Create word
                            </ListItemText>
                        </MenuItem>
                    }
                </MenuList>
            </Paper>
        </Box>
    );
}