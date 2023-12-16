import * as React from 'react';
import { Tenseses } from '../Data/tenseses.ts';
import { useState } from 'react';
import { Button, Box } from '@mui/material';


export interface ITensesListProps {
    tensesList: string[]
    setTensesList: (tenses: string[]) => void
}

export default function TensesList(props: ITensesListProps) {
    const [clickedButtons, setClickedButtons] = useState<string[]>(props.tensesList);

    React.useEffect(() => {
        console.log(props.tensesList)
    }, [props.tensesList]);

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

    React.useEffect(() => {
        console.log(props.tensesList);
        setClickedButtons(props.tensesList);
    }, [props.tensesList]);

    return (
        // <Typography>Tenses</Typography>

        <Box sx={{borderRadius: 2, paddingTop: "20px", paddingBottom: "20px", justifyContent: 'center'}}>
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


