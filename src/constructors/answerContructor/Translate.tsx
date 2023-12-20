import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { Autocomplete, Box, TextField } from '@mui/material';
import { Languages } from '../../Data/Languages';
import { LanguageType } from '../../Data/LanguageType';

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

export interface ITranslate {
    onTranslateChange: (value: any, index: string) => void;
    id: string;
    language: LanguageType
}

export default function Translate(props: ITranslate) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string>();

    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 180}}
            options={Languages}
            autoHighlight
            value={Languages.find(current => current.language == props.language)}
            onChange={(event, value) => props.onTranslateChange(value, props.id)}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box id={option.code} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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