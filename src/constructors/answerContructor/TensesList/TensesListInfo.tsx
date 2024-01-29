import { Box } from "@mui/material";
import TensesListInstruction from "./TensesListInstruction";
import TensesList from "../../phraseContructor/TensesList/TensesList";

export interface IPhraseInfoProps {
    tensesList: string[];
    setTensesList: (tensesList: string[]) => void;
}
export default function TensesListInfo(props: IPhraseInfoProps) {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection='column'
        >
            <TensesListInstruction />
            <TensesList  
                tensesList={props.tensesList}
                setTensesList={props.setTensesList}/>
        </Box>

    )
}