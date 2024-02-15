import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import ConfirmToDeleteModalScreen from "../ConfirmToDeleteModalScreen";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DialogueItemType } from "../GraphTree/DialogueitemType";

export interface IDeleteButton {
    onDelete: (dialogueItemType: DialogueItemType) => void;
    name: string;
}

export default function DeleteButton(props: IDeleteButton) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const confirm = (dialogueItemType: DialogueItemType | null) => {
        if (!!dialogueItemType) {
            props.onDelete(dialogueItemType);
        }

        setIsOpen(false);
    }

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <ConfirmToDeleteModalScreen isOpen={isOpen} confirm={confirm} name={`[${props.name.toUpperCase()}]`} />
            <IconButton onClick={() => setIsOpen(true)} sx={{ color: '#c62828' }}>
                <DeleteOutlinedIcon />
            </IconButton>
        </Box>

    )
}