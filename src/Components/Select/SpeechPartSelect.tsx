import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { SpeechPart } from '../../ThereGame.Business/Models/SpeechPart';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export interface IStyledSelectProp {
    setSelectedSpeechPart: (speechPart: SpeechPart) => void;
    selectedSpeechPart: SpeechPart;
}

export default function SpeechPartSelect(props: IStyledSelectProp) {

    const handleChange = (event: { target: { value: string } }) => {

        props.setSelectedSpeechPart(parseInt(event.target.value));
    };


    const getSpeechPartKeys = () => {
        return Object.keys(SpeechPart).filter((v) => isNaN(Number(v)))
    }

    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Speech part</InputLabel>
                <NativeSelect
                    id="demo-customized-select-native"
                    value={props.selectedSpeechPart}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                      {getSpeechPartKeys().map(speechPart => (
                        <option value={SpeechPart[speechPart]}>{speechPart}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
}