import { Box } from "@mui/material";
import ITranslateModel from "../../../ThereGame.Business/Models/ITranslateModel";
import TranslateConstructor from "../TranslateConstructor";
import TranslatesInstructions from "./TranslatesInstructions";

export interface IPossibleWordsToUseInfoProps {
    translates: ITranslateModel[];
    onTranslateChange: (translates: ITranslateModel[]) => void,
    onDeleteTranslate: (id: string) => void
    onAddTranslate: () => void;
}
export default function TranslatesInfo(props: IPossibleWordsToUseInfoProps) {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection='column'
        >
            <TranslatesInstructions />
            <TranslateConstructor
                translates={props.translates}
                onAddTranslate={props.onAddTranslate}
                onDeleteTranslate={props.onDeleteTranslate}
                onTranslateChange={props.onTranslateChange}
            />
        </Box>

    )
}