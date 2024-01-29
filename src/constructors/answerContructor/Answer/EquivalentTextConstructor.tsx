import { Box, Button, Chip, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTeacher } from "../../../Data/useTeacher";
import DevidedLabel from "../../../components/Headers/DevidedLabel";

export interface EquivalentTextConstructorProps {
    texts: string[];
    chatGpt: (sentence: string) => void;
    onChangeEquivalentAnswer: (value: string, index: number) => void;
    onAddEquivalentAnswer: (text: string) => void;
    onRemoveEquivalentAnswer: (value: string) => void;
    isLoading: boolean;
}


export default function EquivalentTextConstructor(props: EquivalentTextConstructorProps) {
    const [teacher] = useTeacher();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const [selectedTextId, setSelectedTextId] = useState({
        id: 0,
        text: ''
    });
    const [isUpdate, setIsUpdate] = useState<boolean>()


    const onChange = (text: any, id: number) => {
        setSelectedTextId({ text: text, id: id });
        setIsUpdate(true);
    }

    useEffect(() => {
        var isAdmin = teacher?.id == process.env.REACT_APP_ADMIN_ID;
        setIsAdmin(isAdmin);
    }, []);

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
        <Box sx={{width: "100%"}} >
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
                {!isAdmin
                    ? null
                    : props.isLoading
                        ? <CircularProgress />
                        : <Button onClick={() => props.chatGpt(selectedTextId.text)}>ChatGpt</Button>
                }



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
                ))}
            </Stack>
        </Box>
    )
}