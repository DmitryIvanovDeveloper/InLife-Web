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
            <TextField
                sx={{ m: 3, position: "relative", border: "none !important" }}
                InputLabelProps={{ shrink: true }}
                value={props.phrase}
                id="outlined-basic"
                variant='standard'
                onChange={(event) => props.onChangeText(event.target.value)}
                required={true}
                placeholder="Hey! Hello! Today is a great day for fitness!"
                fullWidth
            />

            {/* <PhraseInstruction /> */}

        </Box>

    )
}