import { Box, TextField } from "@mui/material";
import PossibleWordsToUseInstruction from "./PossibleWordsToUseInstruction";

export interface IPossibleWordsToUseInfoProps {
    wordsToUse: string;
    onWordsToUseChange: (wordsTouSe: string) => void;
}
export default function PossibleWordsToUseInfo(props: IPossibleWordsToUseInfoProps) {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection='column'
        >
            <TextField
                sx={{m: 3}}
                InputLabelProps={{ shrink: true }}
                placeholder="Hello, You, Meet, etc."
                value={props.wordsToUse}
                id="outlined-basic"
                label="Possible words"
                variant="outlined"
                onChange={(event) => props.onWordsToUseChange(event.target.value)}
                fullWidth
            ></TextField>

            {/* <PossibleWordsToUseInstruction /> */}
        </Box>

    )
}