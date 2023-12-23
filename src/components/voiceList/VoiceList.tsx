import { Box, MenuItem, Select } from "@mui/material";
import { VoicesOptions } from "../../Data/VoiceList";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less';
// import 'react-h5-audio-player/src/styles.scss'
import { useEffect, useState } from "react";
import IVoiceModel from "./IVoiceModel";

export default function VoiceList() {
    const [voices, setVoices] = useState<IVoiceModel[]>([]);
    const [voice, setVoice] = useState<IVoiceModel>();

    const handleChangeVoicesType = (event: any) => {
        var selectedVoiceOptionType = VoicesOptions.find(v => v.id == event.target.value);
        if (!selectedVoiceOptionType) {
            return;
        }

        setVoices(selectedVoiceOptionType?.voices);
    }

    const handleChangeVoices = (event: any) => {
        var selectedVoice = voices.find(v => v.id == event.target.value);
        if (!selectedVoice) {
            return;
        }

        setVoice(selectedVoice);
    }

    return (
        <Box>
            <Select
                style={{ minWidth: "100px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={voice?.name}
                label="Age"
                onChange={handleChangeVoicesType}
            >
                {VoicesOptions.map(voiceOption => (
                    <MenuItem id={voiceOption.id} value={voiceOption.id}>{voiceOption.type}</MenuItem>
                ))}
            </Select>

            <Select
                style={{ minWidth: "100px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={voice?.name}
                onChange={handleChangeVoices}
            >
                {voices.map(voice => (
                    <MenuItem id={voice.id} value={voice.id}>{voice.name}</MenuItem>
                ))}
            </Select>

            <AudioPlayer
                autoPlay
                src={`${voice?.path}/${voice?.name}.wav`}
            />
        </Box>

    )
}