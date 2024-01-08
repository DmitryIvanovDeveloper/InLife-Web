import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import React from "react";

export interface ILinarProgressCustomProps {
    name: string;
}
export default function LinarProgressCustom(props: ILinarProgressCustomProps) {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography>{props.name}...</Typography>
            <LinearProgress />
        </Box>
    )
}