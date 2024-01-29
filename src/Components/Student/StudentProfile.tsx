import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import AppStore from '../../Images/Stores/AppStore.png';
import PlayMarket from '../../Images/Stores/Google_Play.png';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function KeepMountedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const onGooglePlay = () => {
        window.open('https://codingbeautydev.com', '_blank', 'noreferrer');
    }

    const onPlayMarket = () => {
        window.open('https://codingbeautydev.com', '_blank', 'noreferrer');
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            height='100vh'
        >
            <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
            >
                <Button
                    disableRipple
                    onClick={onGooglePlay}
                    sx={{ width: 400 }}
                    startIcon={<img style={{ margin: 4, width: 400 }} src={PlayMarket} />}
                >
                </Button>
                <Button
                    
                    disableRipple
                    onClick={onPlayMarket}
                    sx={{ width: 400 }}
                    startIcon={<img style={{ margin: 4, width: 400 }} src={AppStore} />}
                >
                </Button>

            </Box>
        </Box>
    );
}