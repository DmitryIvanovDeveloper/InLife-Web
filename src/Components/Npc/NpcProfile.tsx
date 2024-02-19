import { Avatar, Box, IconButton, Typography } from "@mui/material";
import INpc from "../../Data/Locations";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NpcScenes from "./NpcScenes";
import DevidedLabel from "../Headers/DevidedLabel";

export interface INpcProps {
    npc: INpc;
    onToList: () => void;
}
export default function NpcProfile(props: INpcProps) {
    return (
        <Box>
            <IconButton onClick={props.onToList}>
                <ArrowBackIosIcon />
            </IconButton>

            <Box
                display='flex'
                flexDirection="row"
                alignItems="center"
                margin={3}
            >
                <Avatar
                    src={props.npc.avatar}
                />
                <Typography sx={{ marginLeft: "5px" }}>{props.npc.name}</Typography>
            </Box>

            <DevidedLabel name="Scenes" />
            <NpcScenes npc={props.npc} />
        </Box>
    )
}