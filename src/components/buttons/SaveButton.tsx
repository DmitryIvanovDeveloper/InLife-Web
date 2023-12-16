import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDialogues } from "../../Data/useDialogues.ts";

export interface ISaveButton {
    onClick: () => {};
}
export default function SaveButton(props) {
    const dialogues = useDialogues();

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid>
                <Button
                    onClick={props.onClick}
                    variant="contained"
                    color="success"
                    sx={{
                        position: "relative",
                        font: "",
                        fontWeight: 700,
                    }}

                >
                    Save
                </Button>
            </Grid>

        </Box>

    )
}