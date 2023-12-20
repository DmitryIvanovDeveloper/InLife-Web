import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function CircularProgressCustom() {
    return (
        <Box 
            display="flex"
            justifyContent="center"
        >
            <CircularProgress size="1rem" />
        </Box>
    )
}