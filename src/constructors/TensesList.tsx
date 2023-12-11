import * as React from 'react';
import { Tenseses } from '../Data/tenseses.ts';
import { useState } from 'react';
import { Button, createTheme, Box } from '@mui/material';


export interface ITensesListProps {
    tensesList: string[]
    setTensesList: (tenses: string[]) => void
}

export default function TensesList(props: ITensesListProps) {
    const [clickedButtons, setClickedButtons] = useState<string[]>([]);

    function OnClick(event) {

        var index = clickedButtons?.indexOf(event.target.value);
        if (index <= -1) {
            var newClickedButtons = [...clickedButtons, event.target.value];
            setClickedButtons(newClickedButtons);
            props.setTensesList(newClickedButtons);
            return;
        }

        var tensesList = clickedButtons.filter(button => button != event.target.value)
        setClickedButtons(tensesList);
        props.setTensesList(tensesList);

    }

    return (
        <Box >
            {Tenseses.map(tenses => (
                <Button
                    variant={!clickedButtons.find(button => button == tenses) ? "outlined" : "contained"} 
                    style={{ margin: "5px", fontWeight: 700 }} 
                    value={tenses} 
                    onClick={OnClick}>{tenses}
                </Button>
            ))}
        </Box>

    );
}

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});


