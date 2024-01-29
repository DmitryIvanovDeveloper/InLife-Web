import { Box, TextField } from "@mui/material";
import DialogueNameInsrtuction from "./DialogueNameInsrtuction";

export interface IDialogueNameInfoProps {
    onChangeName: (name: string) => void;
    name: string;
}
export default function DialogueNameInfo(props: IDialogueNameInfoProps) {
    return (
        <Box>
            <DialogueNameInsrtuction />
            <TextField
                fullWidth
                onChange={(event) => props.onChangeName(event.target.value)}
                value={props.name}
                required={true}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{mt: 3}}
            />
        </Box>

    )
}