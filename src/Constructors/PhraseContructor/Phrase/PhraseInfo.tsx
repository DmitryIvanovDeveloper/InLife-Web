import { Box, IconButton, TextField } from "@mui/material";
import PhraseInstruction from "./PhraseInstruction";
import SendIcon from '@mui/icons-material/Send';

export interface IPhraseInfoProps {
    phrase: string;
    onChangeText: (phrase: string) => void;
}
export default function PhraseInfo(props: IPhraseInfoProps) {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <Box
                display="flex"
                sx={{ ...commonStyles, borderRadius: '5px', width: "100%" }}
                justifyContent='space-between'
                alignItems='center'
            >
                <TextField
                    sx={{ m: 3, position: "relative", border: "none !important" }}
                    InputLabelProps={{ shrink: true }}
                    value={props.phrase}
                    id="outlined-basic"
                    variant='standard'
                    onChange={(event) => props.onChangeText(event.target.value)}
                    required={true}
                    placeholder="Hey! Hello! Today is a great day for fitness!"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    fullWidth
                />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </Box>

            <PhraseInstruction />

        </Box>

    )
}


const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.secondary',
    m: 1,
    border: 0.1,
    width: '3rem',
    height: '3.5rem',
};
