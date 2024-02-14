import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import ConfirmToDeleteModalScreen from "../ConfirmToDeleteModalScreen";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export interface IDeleteButton {
    onDelete: () => void;
}

export default function DeleteButton(props: IDeleteButton) {
    const [isOpen, setIsOpen] = useState(false);

    const confirm = (isConfirm: boolean) => {
        if (isConfirm) {
            props.onDelete();
        }
        setIsOpen(false);
    }

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <ConfirmToDeleteModalScreen isOpen={isOpen} confirm={confirm} />
            <IconButton onClick={() => setIsOpen} sx={{ color: '#c62828' }}>
                <DeleteOutlinedIcon />
            </IconButton>
        </Box>

    )
}