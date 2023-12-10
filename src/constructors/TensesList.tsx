import * as React from 'react';
import { Tenseses } from '../Data/tenseses.ts';
import { useEffect, useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';


export interface ITensesListProps {
    tensesList: string[]
}

export default function TensesList(props: ITensesListProps) {
    const [tensesName, setTensesName] = useState<string[]>([]);
    const [clickedButtons, setClickedButtons]  = useState<string[]>([]);

    useEffect(() => {
       
        setTensesName(props.tensesList);
    }, []);

    function OnClick(event){
        var index = clickedButtons?.indexOf(event.target.value);
        if (!index){
            setClickedButtons([...clickedButtons, event.target.value]);
            return;
        }

        setClickedButtons([...clickedButtons.splice(index, 1), event.target.value]);
    }

    return (
        <ButtonGroup  
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            size='small'
        >
            {Tenseses.map(tenses => (
                <Button style={{padding: "5px"}} onClick={OnClick}>{tenses}</Button>
            ))}
      </ButtonGroup>
    );
}


