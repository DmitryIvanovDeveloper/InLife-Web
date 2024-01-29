import { Box } from "@mui/material";
import VoiceList from "../../../components/VoiceList/VoiceList";
import VoiceSettingsInstruction from "./VoiceSettingsInstruction";


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