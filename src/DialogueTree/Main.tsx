import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import Dialogues from "./Dialogues";
import { Box } from "@mui/material";
import GameWebGL from "../Components/GameWebGL/GameWebGL";

export default function Main() {

    const [dialogueItemConstructor] = useDialogueItemConstructor();
 

    return (
        //@ts-ignore
        <SplitPane split="vertical" minSize={250} defaultSize={window.innerWidth / 2} maxSize={window.innerWidth / 2}>
            <Dialogues />
            <Box sx={{overflow: 'scroll', height: window.screen.height}}>
                <GameWebGL />
                {dialogueItemConstructor}
            </Box>
        </SplitPane>
    )
}

