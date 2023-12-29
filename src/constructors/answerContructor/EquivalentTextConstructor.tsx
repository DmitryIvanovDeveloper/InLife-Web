import { Box, Button, Grid, TextField } from "@mui/material"

export interface EquivalentTextConstructorProps {
    texts: string[];
    onChangeEquivalentAnswer: (value: string, index: number) => void;
    onAddEquivalentAnswer: () => void;
    onRemoveEquivalentAnswer: (value: string) => void;
}

export default function EquivalentTextConstructor(props: EquivalentTextConstructorProps) {
    return (
        <Box>
            {props.texts.map((text, index) => (
                <Grid
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ pt: 1 }}
                >
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        placeholder="Yes, today is a greate day!"
                        value={text}
                        id="outlined-basic"
                        label="Text"
                        variant="outlined"
                        onChange={(event) => props.onChangeEquivalentAnswer(event.target.value, index)}
                        required={true}
                        fullWidth
                    />
                    <Button onClick={(event) => props.onRemoveEquivalentAnswer(text)}>Delete</Button>
                </Grid>
            ))}
             <Box sx={{pt: 1}} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ backgroundColor: "darkgreen", color: "white", }}  onClick={props.onAddEquivalentAnswer}>Add Equivalent Answer</Button>
            </Box>
        </Box>
    )
}