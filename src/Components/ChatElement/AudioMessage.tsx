//@ts-nocheck
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageBox } from "react-chat-elements";

export interface IAudioMessageProps {
    title: string;
    position: string;
    type: string;
    audioUrl: string
}
export default function AudioMessage(props: IAudioMessageProps) {
    const [audioBase64, setAudioBase64] = useState<string>(base64ToAudioData(props.audioUrl))
    const [isReloading, setIsReloading] = useState<boolean>()

    function base64ToAudioData(base64String) {
        return `data:audio/mpeg;base64,${base64String}`;
    }

    useEffect(() => {
        setAudioBase64(base64ToAudioData(props.audioUrl));
        setIsReloading(true);

        setTimeout(() => {
            setIsReloading(false);
        }, 0)
    }, [props.audioUrl])

    return (
        <Box>
            {isReloading
                ? <CircularProgress />
                : <MessageBox
                    position={"left"}
                    type={"audio"}
                    title={""}
                    data={{
                        audioURL: audioBase64,
                    }}

                />
            }
        </Box>

    )
}