import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


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

    const [mousePos, setMousePos] = useState<IMousePosition>({ x: 0, y: 0 });

    const handleMouseMove = (event: MouseEvent) => {
        setMousePos({ x: event.offsetX, y: event.offsetY });
        console.log(event);
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseMove);
       
        return () => {
            window.removeEventListener(
                'click',
                handleMouseMove
            );
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: mousePos.y, 
            left: mousePos.x,
        }}>
            <Paper sx={{ width: 350, maxWidth: '100%' }} >
                <MenuList>
                    {props.isWordExist
                        ? <MenuItem onClick={props.onAddWord} disabled={props.isLoading}>
                            <ListItemIcon >
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            {props.isLoading

                                ? <Box display='flex' justifyContent='center'>
                                    <Typography>{props.isSelectedWordExistInVocabularyWords ? `Deleting '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word` : `Adding '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`}</Typography>
                                    <CircularProgress size={25} />
                                </Box>
                                : <ListItemText>{props.isSelectedWordExistInVocabularyWords ? `Remove '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word` : `Add '${props.selecetedWord.toLocaleUpperCase()}' as vocabulary word`}</ListItemText>
                            }

                        </MenuItem>
                        : <MenuItem onClick={props.onCreateWord} >
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText> Create word</ListItemText>
                        </MenuItem>
                    }
                </MenuList>
            </Paper>
        </div>
    );
}