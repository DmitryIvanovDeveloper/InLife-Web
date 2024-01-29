import { Box } from "@mui/material";
import EquivalentTextConstructor from "./EquivalentTextConstructor";
import EquivalentAnswersInstructions from "./EquivalentAnswersInstructions";

export interface IEquivalentAnswersInfoProps {
    texts: string[];
    chatGpt: (sentence: string) => void;
    onChangeEquivalentAnswer: (value: string, index: number) => void;
    onAddEquivalentAnswer: (text: string) => void;
    onRemoveEquivalentAnswer: (value: string) => void;
    isLoading: boolean;
}
export default function EquivalentAnswersInfo(props: IEquivalentAnswersInfoProps) {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            flexDirection='column'
        >
            <EquivalentAnswersInstructions />
            <EquivalentTextConstructor
                onChangeEquivalentAnswer={props.onChangeEquivalentAnswer}
                onAddEquivalentAnswer={props.onAddEquivalentAnswer}
                onRemoveEquivalentAnswer={props.onRemoveEquivalentAnswer}
                texts={props.texts}
                chatGpt={props.chatGpt}
                isLoading={props.isLoading}
            />
        </Box>

    )
}