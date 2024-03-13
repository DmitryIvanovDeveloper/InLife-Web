import { Box, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import ActionButton from "../Button/ActionButton";
import Save from '@mui/icons-material/Save';

export default function NewCard() {
    const [word, setWord] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoty, setCategoty] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategoty(event.target.value);
    };

    const onSave = () => {

    }
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <div>
                <FormControl sx={{ m: 1, width: "300px",minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={categoty}
                        onChange={handleChange}
                        autoWidth
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                    </Select>
                </FormControl>
            </div> */}
            <TextField sx={{ m: 1 }} label='word'></TextField>
            <TextField sx={{ m: 1 }} label='answer'></TextField>
            <ActionButton icon={<Save />} onClick={onSave} isLoading={isLoading} isDisabled={false} />
        </Card>
    )
}