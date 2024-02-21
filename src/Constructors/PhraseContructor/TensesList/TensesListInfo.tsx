import { Box } from "@mui/material";
import TensesListInstruction from "./TensesListInstruction";
import TensesListConstructor from "../../DialogueLine/TensesList/TensesListConstructor";

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
            <TensesListConstructor  
                tensesList={props.tensesList}
                setTensesList={props.setTensesList}
            />
        </Box>

    )
}