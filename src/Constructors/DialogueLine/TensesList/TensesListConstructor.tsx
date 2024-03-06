import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import DevidedLabel from "../../../Components/Headers/DevidedLabel";
import { Tenseses } from "../../../Data/tenseses";

export interface IPhraseInfoProps {
    tensesList: string[];
    setTensesList: (tensesList: string[]) => void;
}
export default function TensesListConstructor(props: IPhraseInfoProps) {
    const [clickedButtons, setClickedButtons] = useState<string[]>(props.tensesList);

    function OnClick(event: any) {

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

    useEffect(() => {
        setClickedButtons(props.tensesList);
    }, [props.tensesList]);

    return (
        <Box sx={{ borderRadius: 2, paddingTop: "20px", paddingBottom: "20px", justifyContent: 'center' }}>
            {Tenseses.map(tenses => (
                <Button
                    variant={!clickedButtons?.find(button => button == tenses) ? "outlined" : "contained"}
                    style={{ margin: "5px", fontWeight: 700 }}
                    value={tenses}
                    onClick={OnClick}>{tenses}
                </Button>
            ))}
        </Box>

    );
}