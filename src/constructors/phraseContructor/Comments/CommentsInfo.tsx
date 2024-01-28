import { Box, TextField } from "@mui/material";
import CommentsInstruction from "./CommentsInstruction";

export interface ICommentsInfoProps {
    comments: string;
    onCommentsChange: (comment: string) => void;
}
export default function CommentsInfo(props: ICommentsInfoProps) {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection='column'
        >
            <CommentsInstruction />
            <TextField
                sx={{m: 3}}
                InputLabelProps={{ shrink: true }}
                value={props.comments}
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                onChange={(event) => props.onCommentsChange(event.target.value)}
                fullWidth
            />
        </Box>
    )
}