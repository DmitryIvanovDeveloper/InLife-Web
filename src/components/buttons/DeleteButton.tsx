import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ConfirmToDeleteModalScreen from "../ConfirmToDeleteModalScreen.tsx";

export interface IDeleteButton {
    onClick: () => void;
}

export default function DeleteButton(props: IDeleteButton) {
    const [isOpen, setIsOpen] = useState(false);
    
    const confirm = (isConfirm: boolean) => {
        setIsOpen(false);
        props.onClick();
        
    }
    return (
        <Box style={{display: "flex", justifyContent: "flex-end"}}>
            <ConfirmToDeleteModalScreen isOpen={isOpen} confirm={confirm}/>
            <Button
                onClick={() => setIsOpen(true)}
                variant="contained"
                sx={{
                    position: "relative",
                    backgroundColor: "#b71c1c",
                    font: "",
                    fontWeight: 700,
                }}
                
                style={{ maxWidth: '80px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
            >
                Delete
            </Button>
        </Box>

    )
}