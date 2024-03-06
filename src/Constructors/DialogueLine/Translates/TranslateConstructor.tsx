import { Box, Button, Grid, TextField } from "@mui/material";
import ITranslateModel from "../../../ThereGame.Business/Models/ITranslateModel";
import DevidedLabel from "../../../Components/Headers/DevidedLabel";
import Translate from "./Translate";

export interface ITranslateConstructor {
    translates: ITranslateModel[];
    onTranslateChange: (translates: ITranslateModel[]) => void,
    onDeleteTranslate: (id: string) => void
    onAddTranslate: () => void;
}

export default function TranslateConstructor(props: ITranslateConstructor) {

    const onTranslateLanguageChange = (event: any, id: string) => {
        
        var translate = props.translates.find(translate => translate.id == id);
        if (!translate) {
            return;
        }

        var updatedTranslate: ITranslateModel = {
            parentId: translate.parentId,
            id: translate.id,
            language: event?.language,
            text: translate.text,
        }

        var translates = props.translates.filter(translate => translate.id != id);

        translates.push(updatedTranslate);

        props.onTranslateChange(translates)
    }

    const onTranslateTextChange = (value: string, id: string) => {
        var translate = props.translates.find(translate => translate.id == id);
        if (!translate) {
            return;
        }

        var updatedTranslate: ITranslateModel = {
            parentId: translate.parentId,
            id: translate.id,
            language: translate.language,
            text: value,
        }

        var translates = props.translates.filter(translate => translate.id != id);

        translates.push(updatedTranslate);

        props.onTranslateChange(translates)
    }

    return (
        <Box sx={{ pt: 3, pb: 3, width: "100%" }}>
            
            <DevidedLabel name="Translates Hints"/>

            {props.translates.map(translate => (
                <Grid
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ pt: 1 }}
                    key={translate.id}
                >
                    <Translate 
                        onTranslateChange={onTranslateLanguageChange} 
                        id={translate.id} 
                        language={translate.language} 
                    />
                    <TextField
                        key={translate.id}
                        sx={{ pl: 1 }}
                        InputLabelProps={{ shrink: true }}
                        value={translate.text}
                        placeholder="Да, сегодня отличный день!"
                        id={translate.id}
                        label="Translate"
                        variant="outlined"
                        required={true}
                        onChange={(event) => onTranslateTextChange(event.target.value, translate.id)}
                        fullWidth
                    />
                    <Button onClick={() => props.onDeleteTranslate(translate.id)}>Delete</Button>
                </Grid>
            ))}


            <Box sx={{ pt: 1 }} style={{ display: "flex", justifyContent: "flex-end" }}>
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