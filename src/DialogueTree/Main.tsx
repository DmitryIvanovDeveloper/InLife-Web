import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import Dialogues from "./Dialogues";
import { Box } from "@mui/material";
import GameWebGLEditor from "../Components/GameWebGL/GameWebGLEditor";

export default function Main() {

    const [dialogueItemConstructor] = useDialogueItemConstructor();
    console.log("huy");

    return (
        //@ts-ignore
        <SplitPane split="vertical" minSize={250} defaultSize={window.innerWidth / 2} maxSize={window.innerWidth / 2}>
            <Dialogues />
            <Box sx={{overflow: 'scroll', height: window.screen.height}}>
                <GameWebGLEditor />
                {dialogueItemConstructor}
            </Box>
        </SplitPane>
    )
}

