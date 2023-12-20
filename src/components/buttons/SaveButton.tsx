import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

export interface ISaveButtonProps {
    onClick: () => void;
    isLoading: boolean
}
export default function SaveButton(props: ISaveButtonProps) {

    const [success, setSuccess] = React.useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        if (!props.isLoading) {
            setSuccess(false);
            return;
        }

        setSuccess(true);
    }, [props.isLoading]);

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={() => props.onClick()}
                >
                    {props.isLoading ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {props.isLoading && (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}