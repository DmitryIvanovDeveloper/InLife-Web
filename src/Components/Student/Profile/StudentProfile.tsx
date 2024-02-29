import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import AppStore from '../../../Images/Stores/AppStore.png';
import PlayMarket from '../../../Images/Stores/Google_Play.png';
import GameWebGL from '../../GameWebGL/GameWebGL';
import { useEffect } from 'react';

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

export default function StudentProfile() {
    function PlayMarketButton(): React.ReactElement {
        return (
            <Button

                disableRipple
                onClick={() => window.open('https://codingbeautydev.com', '_blank', 'noreferrer')}
                sx={{ width: 200, m: "4" }}
                startIcon={<img style={{ margin: 4, width: 200 }} src={PlayMarket} />}
            >
            </Button>
        )
    }
    function AppleStoreButton(): React.ReactElement {
        return (
            <Button
                disableRipple
                onClick={() =>  window.open('https://codingbeautydev.com', '_blank', 'noreferrer')}
                sx={{ width: 200, m: "4" }}
                startIcon={<img style={{ margin: 4, width: 200 }} src={AppStore} />}
            >
            </Button>
        )
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            height='100vh'
            justifyContent='center'
            sx={{
                width: "100%",
            }}
        >
            <Box
                display='flex'
                justifyContent='flex-start'
                alignItems='flex-end'
                flexDirection='row'
            >
                {/* <PlayMarketButton />
                <AppleStoreButton /> */}
            </Box>

            <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
            >
                <GameWebGL />
            </Box>
        </Box>
    );
}