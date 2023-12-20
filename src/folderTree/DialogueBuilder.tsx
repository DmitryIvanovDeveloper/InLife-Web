import React, { useState } from "react";
import Dialogues from "./Dialogues.tsx";
import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues.ts";

export default function DialogueBuilder() {

    const [dialogueItemConstructor, _] = useDialogueItemConstructor();

    return (
        //@ts-ignore
        
        <SplitPane split="vertical" minSize={250} defaultSize={200} maxSize={window.innerWidth / 2}>
            <Dialogues />
            {dialogueItemConstructor}
        </SplitPane>
    )
}