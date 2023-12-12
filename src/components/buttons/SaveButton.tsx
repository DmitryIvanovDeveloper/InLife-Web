import { Box, Button } from "@mui/material";
import React from "react";
import { useDialogues } from "../../Data/useDialogues.ts";

export interface ISaveButton {
    onClick: () => {};
}
export default function SaveButton(props) {
    const dialogues = useDialogues();

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                onClick={props.onClick}
                variant="contained"
                color="success"
                sx={{
                    position: "relative",
                    font: "",
                    fontWeight: 700,
                }}

                style={{ maxWidth: '80px', maxHeight: '40px', minWidth: '50px', minHeight: '40px' }}
            >
                Save
            </Button>
        </Box>

    )
}