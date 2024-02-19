import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import Dialogues from "./Dialogues";

export default function DialogueBuilder() {

    const [dialogueItemConstructor, _] = useDialogueItemConstructor();
    
    return (
        //@ts-ignore
        <SplitPane split="vertical" minSize={250} defaultSize={window.innerWidth / 2} maxSize={window.innerWidth / 2}>
            <Dialogues />
            {dialogueItemConstructor}
        </SplitPane>
    )
}

