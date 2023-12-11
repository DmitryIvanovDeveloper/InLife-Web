import * as React from 'react';
import { Tenseses } from '../Data/tenseses.ts';
import { useState } from 'react';
import { ButtonGroup, Button, createTheme } from '@mui/material';


export interface ITensesListProps {
    tensesList: string[]
    setTensesList: (tenses: string[]) => void
}

export default function TensesList(props: ITensesListProps) {
    const [clickedButtons, setClickedButtons]  = useState<string[]>([]);
    const maxPossibleTenses = 1;

    function OnClick(event){

        var index = clickedButtons?.indexOf(event.target.value);
        if(index <= -1 && clickedButtons.length <= maxPossibleTenses) {
            var newClickedButtons = [...clickedButtons, event.target.value];
            setClickedButtons(newClickedButtons);
            props.setTensesList(newClickedButtons);
            return;
        }
        
        var tensesList  = clickedButtons.filter(button => button !=  event.target.value)
        setClickedButtons(tensesList);
        props.setTensesList(tensesList);

    }



    return (
        <ButtonGroup  
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            size='small'
        >
            {Tenseses.map(tenses => (
                <Button variant={!clickedButtons.find(button => button == tenses) ? "contained" : "outlined"}  style={{padding: "5px"}} value={tenses} onClick={OnClick}>{tenses}</Button>
            ))}
      </ButtonGroup>
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


