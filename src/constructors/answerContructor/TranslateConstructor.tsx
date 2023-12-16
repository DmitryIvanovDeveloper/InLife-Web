import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Translate from "./Translate.tsx";
import ITranstateModel from "../../ThereGame.Business/Models/ITranslateModel.ts";

export interface ITranslateConstructor {
    translates: ITranstateModel[];
    onTranslateChange: (value: string) => void;
    onDeleteTranslate: (id: string) => void
    onAddTranslate: () => void;
}

export default function TranslateConstructor(props: ITranslateConstructor) {
    return (
        <Box sx={{ pt: 3, pb: 3 }}>
            {props.translates.map(translate => (
                <Grid
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ pt: 1 }}
                >
                    <Translate />
                    <TextField
                        sx={{ pl: 1 }}
                        InputLabelProps={{ shrink: true }}
                        value={translate.text}
                        placeholder="Да, сегодня отличный день!"
                        id="outlined-basic"
                        label="Translate"
                        variant="outlined"
                        onChange={event => props.onTranslateChange(event.target.value)}
                        required={true}
                        fullWidth
                    />
                    <Button onClick={() => props.onDeleteTranslate(translate.id)}>Delete</Button>
                </Grid>
            ))}


            <Box sx={{pt: 1}} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    style={{ backgroundColor: "darkgreen", color: "white" }}
                    onClick={() => props.onAddTranslate()}
                >
                    Add Translate
                </Button>
            </Box>
        </Box>
    )
}