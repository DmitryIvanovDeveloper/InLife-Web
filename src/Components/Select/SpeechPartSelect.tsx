import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { SpeechPart } from '../../ThereGame.Business/Models/SpeechPart';
import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

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
    setSelectedSpeechParts: (speechParts: SpeechPart[]) => void;
    selectedSpeechParts: SpeechPart[];
}

export default function SpeechPartSelect(props: IStyledSelectProp) {

    const [speechParts, setSpeechParts] = React.useState<SpeechPart[]>([SpeechPart.Unknown]);

    useEffect(() => {

        if (!props.selectedSpeechParts.length) {
            return;
        }

        setSpeechParts(props.selectedSpeechParts);
    }, [props.selectedSpeechParts]);

    const handleChange = (event: { target: { value: string } }, index: number) => {

        var updatedSpeechParts = [...speechParts];

        if (parseInt(event.target.value) == SpeechPart.Unknown) {
            updatedSpeechParts = updatedSpeechParts.splice(index, 1)
        }
        else 
        {
            updatedSpeechParts[index] = parseInt(event.target.value);
        }

        props.setSelectedSpeechParts(updatedSpeechParts);
    };

    useEffect(() => {

     
    }, [speechParts]);


    const getSpeechPartKeys = () => {
        return Object.keys(SpeechPart).filter((v) => isNaN(Number(v)))
    }

    return (
        <Box>
            {speechParts.map((speechPart, index) => (
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="demo-customized-select-native">Speech part</InputLabel>
                    <NativeSelect
                        id="demo-customized-select-native"
                        value={speechPart}
                        multiline
                        onChange={(event) => handleChange(event, index)}
                        input={<BootstrapInput />}
                    >
                        {getSpeechPartKeys().map(speechPart => (
                            <option value={SpeechPart[speechPart]}>{speechPart}</option>
                        ))}
                    </NativeSelect>
                </FormControl>
            ))}
            <Button onClick={() => setSpeechParts([...speechParts, SpeechPart.Unknown])}>Add speech paprt</Button>
        </Box>
    );
}