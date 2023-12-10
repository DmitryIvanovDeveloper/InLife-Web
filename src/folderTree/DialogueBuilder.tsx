import React, { useState } from "react";
import ControlledTreeView from "./ControlledTreeView.tsx";
import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues.ts";

export default function DialogueBuilder() {

    const [dialogueItemConstructor, _] = useDialogueItemConstructor();

    return (
        //@ts-ignore
        <SplitPane split="vertical" minSize={250} defaultSize={200} maxSize={1000}>
            <ControlledTreeView />
            {dialogueItemConstructor}
        </SplitPane>
    )
}