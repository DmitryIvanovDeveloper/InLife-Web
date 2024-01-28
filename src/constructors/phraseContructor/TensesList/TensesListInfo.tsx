import { Box } from "@mui/material";
import TensesList from "./TensesList";
import TensesListInstruction from "./TensesListIntruction";

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