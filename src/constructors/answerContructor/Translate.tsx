import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { Autocomplete, Box, TextField } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const languages = [{
    label: "Russian",
    code: "RU"
},
{
    label: "Deutsche",
    code: "De"
},
{
    label: "France",
    code: "FR"
},
{
    label: "Spain",
    code: "SE"
}];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Translate() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);


    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 180}}
            options={languages}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Language"
                />
            )}
        />
    );

}