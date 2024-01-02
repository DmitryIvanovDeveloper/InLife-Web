import { Box, Button, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material"
import DevidedLabel from "../../components/Headers/DevidedLabel";
import { useState } from "react";

export interface EquivalentTextConstructorProps {
    texts: string[];
    onChangeEquivalentAnswer: (value: string, index: number) => void;
    onAddEquivalentAnswer: (text: string) => void;
    onRemoveEquivalentAnswer: (value: string) => void;
}


export default function EquivalentTextConstructor(props: EquivalentTextConstructorProps) {

    const [selectedTextId, setSelectedTextId] = useState({
        id: 0,
        text: ''
    });
    const [isUpdate, setIsUpdate] = useState<boolean>()


    const onChange = (text: any, id: number) => {
        setSelectedTextId({ text: text, id: id });
        setIsUpdate(true);
    }

    const onSave = () => {

        if (isUpdate) {
            props.onChangeEquivalentAnswer(selectedTextId.text, selectedTextId.id);
        }
        else {
            props.onAddEquivalentAnswer(selectedTextId.text);
        }
        setSelectedTextId({ text: "", id: 0 });
        setIsUpdate(false);
    }

    return (
        <Box>
            <DevidedLabel name="Possible equivalent Text" />
            <TextField
                InputLabelProps={{ shrink: true }}
                placeholder="Yes, today is a greate day!"
                value={selectedTextId.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={(event) => setSelectedTextId(prev => ({
                    ...prev,
                    text: event.target.value
                }))}
                required={true}
                fullWidth
            />


            <Box sx={{ pt: 1 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    disabled={!selectedTextId.text}
                    style={{ backgroundColor: "darkgreen", color: "white", }}
                    onClick={onSave}>{!isUpdate ? "Add" : "Update"}</Button>
            </Box>
            <Stack
                spacing={1}
                sx={{ m: 2 }}
            >

                {props.texts.map((text, index) => (
                    <Grid
                        sx={{ pt: 1 }}
                    >
                        <Chip
                            sx={{ p: 1 }}
                            tabIndex={index}
                            label={text}
                            onClick={(event) => onChange(text, index)}
                            onDelete={() => props.onRemoveEquivalentAnswer(text)}
                        />
                    </Grid>

                    // <Grid
                    //     display="flex"
                    //     justifyContent="space-around"
                    //     alignItems="center"
                    //     sx={{ pt: 1 }}
                    // >
                    //     <TextField
                    //         InputLabelProps={{ shrink: true }}
                    //         placeholder="Yes, today is a greate day!"
                    //         value={text}
                    //         id="outlined-basic"
                    //         label="Text"
                    //         variant="outlined"
                    //         onChange={(event) => props.onChangeEquivalentAnswer(event.target.value, index)}
                    //         required={true}
                    //         fullWidth
                    //     />
                    //     <Button onClick={(event) => props.onRemoveEquivalentAnswer(text)}>Delete</Button>
                    // </Grid>
                ))}
            </Stack>
        </Box>
    )
}