import { Box, TextField } from "@mui/material";
import PhraseInstruction from "./PhraseInstruction";

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
            <PhraseInstruction />
            <TextField
                sx={{m: 3}}
                InputLabelProps={{ shrink: true }}
                value={props.phrase}
                id="outlined-basic"
                label="Phrase"
                variant="outlined"
                onChange={(event) => props.onChangeText(event.target.value)}
                required={true}
                placeholder="Hey! Hello! Today is a great day for fitness!"
                fullWidth
            />
        </Box>

    )
}