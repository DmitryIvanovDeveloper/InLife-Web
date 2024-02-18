import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { IMistakeExplanationModel } from "../../ThereGame.Business/Models/IExplanationModel";
import DevidedLabel from "../../Components/Headers/DevidedLabel";

export interface IMistakeExplanationConstructor {
    explanations: IMistakeExplanationModel[]
    onExplanationChange: (event: string, index: number) => void
    onDeleteMistakeExplanation: (id: string) => void;
    onAddMistakeExplanation: () => void
}
export default function MistakeExplanationConstructor(props: IMistakeExplanationConstructor) {
    const [errors, setErrors] = useState({
        text: false,
        translate: false,
        wordsToUse: false,
        mistakeExplanations: [{
            id: "",
            word: false,
            explanation: false,
        }]
    });

    return (
        <Box>
            <DevidedLabel name="Specific words explanation"/>

             {props.explanations.map((explanation, id) => (
                <Grid
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ pt:1 }}
                >
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={explanation.word}
                        id="word"
                        label="Word"
                        placeholder="are"
                        required={true}
                        variant="outlined"
                        onChange={(event: any) => props.onExplanationChange(event, id)}
                        // error={errors.mistakeExplanations.find(e => e.id == explanation.id)?.word}
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ pl: 0.5 }}
                        value={explanation.explanation}
                        id="mistake explanation"
                        label="Mistake Explanation"
                        placeholder="are - множественное число, день - используется в единственном числе"
                        variant="outlined"
                        required={true}
                        onChange={(event: any) => props.onExplanationChange(event, id)}
                        // error={errors.mistakeExplanations.find(e => e.id == explanation.id)?.explanation}

                        fullWidth
                    />
                    <Button onClick={() => props.onDeleteMistakeExplanation(explanation.id)}>Delete</Button>
                </Grid>
            ))}
            <Box sx={{pt: 1}} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ backgroundColor: "darkgreen", color: "white", }} onClick={props.onAddMistakeExplanation}>Add mistake explanation</Button>
            </Box>
        </Box>
       
    )
}