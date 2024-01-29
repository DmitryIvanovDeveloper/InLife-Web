import { Box, Grid, MenuItem, Select } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { VoicesOptions } from "../../Data/VoiceList/VoiceList";
// import 'react-h5-audio-player/lib/styles.less';
// import 'react-h5-audio-player/src/styles.scss'
import { useEffect, useState } from "react";
import IVoiceOption from "../../Data/VoiceList/IVoiceOption";
import IVoiceModel from "./IVoiceModel";

export interface IVoiceListProps {
    dialogueId: string,
    setIsVoiceSelected: (voiceSettings: string) => void;
    voiceSettings: string;
}
export default function VoiceList(props: IVoiceListProps) {

    const [voices, setVoices] = useState<IVoiceModel[]>([]);
    const [voiceOption, setVoiceOption] = useState<IVoiceOption | null>();
    const [voice, setVoice] = useState<IVoiceModel | null>();

    const handleChangeVoicesType = (event: any) => {
        var selectedVoiceOptionType = VoicesOptions.find(v => v.type == event.target.value);
        if (!selectedVoiceOptionType) {
            return;
        }

        setVoiceOption(selectedVoiceOptionType);
        setVoice(null);
    }

    const handleChangeVoices = (event: any) => {
        var selectedVoice = voices.find(v => v.name == event.target.value);
        if (!selectedVoice) {
            return;
        }

        setVoice(selectedVoice);
    }

    useEffect(() => {
        if (!props.voiceSettings) {
            setVoiceOption(null);
            setVoice(null)
            return;
        }

        var parsedData = JSON.parse(props.voiceSettings);

        var selectedVoiceOption = VoicesOptions.find(vo => vo.type == parsedData.type);
        var selectedVoice = selectedVoiceOption?.voices.find(v => v.name = parsedData.name);

        setVoiceOption(selectedVoiceOption);
        setVoice(selectedVoice);
    }, [props.dialogueId]);

    useEffect(() => {
        if (!voiceOption) {
            props.setIsVoiceSelected("");
            return;
        }

        setVoices(voiceOption?.voices);
    }, [voiceOption]);

    useEffect(() => {
        if (!voiceOption || !voice) {
            props.setIsVoiceSelected("");
            return;
        }

        props.setIsVoiceSelected(JSON.stringify({ name: voice.name, type: voiceOption.type }));
    }, [voiceOption, voice]);

    return (
        <Box sx={{width: "100%"}}>
            <Grid
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                sx={{ pt: 1, mb: 0.5, mt: 3 }}
                
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Voice Option"
                    value={`${voiceOption?.type}`}
                    onChange={handleChangeVoicesType}
                    fullWidth
                    disabled={!!props.voiceSettings}
                >
                    {VoicesOptions.map(voiceOption => (
                        <MenuItem key={voiceOption.id} id={voiceOption.id} value={voiceOption.type}>{voiceOption.type}</MenuItem>
                    ))}
                </Select>

                <Select
                    defaultValue={voice?.id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeVoices}
                    value={`${voice?.name}`}
                    fullWidth
                    disabled={!!props.voiceSettings}
                >
                    {voices.map(voice => (
                        <MenuItem key={voice.id} id={voice.id} value={voice.name}>{voice.name}</MenuItem>
                    ))}
                </Select>


            </Grid>
            <Box
                sx={{ pt: 1, mb: 1 }}
            >
                <AudioPlayer
                    autoPlay={false}
                    src={`${voice?.path}/${voice?.name}.wav`}
                />
            </Box>

        </Box>
    )
}