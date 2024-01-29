import { Box } from "@mui/material";
import VoiceSettingsInstruction from "./VoiceSettingsInstruction";
import VoiceList from "../../../Components/VoiceList/VoiceList";


export interface IVoiceSettingsInfoProps {
    dialogueId: string,
    setIsVoiceSelected: (voiceSettings: string) => void;
    voiceSettings: string;
}
export default function VoiceSettingsInfo(props: IVoiceSettingsInfoProps) {
    return (
        <Box>
            <VoiceSettingsInstruction />
            <VoiceList
                dialogueId={props.dialogueId}
                setIsVoiceSelected={props.setIsVoiceSelected}
                voiceSettings={props.voiceSettings}
            />
        </Box>
    )
}