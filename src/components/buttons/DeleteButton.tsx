import { Box, Button } from "@mui/material";
import React from "react";

export interface IDeleteButton {
    onClick: () => void;
}

export default function DeleteButton(props: IDeleteButton) {
    return (
        <Box style={{display: "flex", justifyContent: "flex-end"}}>
            <Button
                onClick={props.onClick}
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