import React, { useEffect, useState } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { DialogueItemNode } from "./DialogueItemNode";
import { NodeType } from "./DialogueitemType";
import { Box } from "@mui/material";


export interface IDialoguesGraphProps {
    dialogue: IDialogueModel
}

export default function DialogueGraph(props: IDialoguesGraphProps) {
    const [data, setData] = useState<RawNodeDatum>();
    const nodeSize = { x: 200, y: 200 };
    const [selectedNodeId, setSelectedNodeId] = useState<string>("");

    function transformPhrase(phrase: IPhraseModel): RawNodeDatum {
        var node: RawNodeDatum = {
            name: phrase.text,
            children: phrase.answers.map(answer => transformAnswer(answer)),
            attributes: {
                id: phrase.id,
                nodeType: NodeType.Phrase,
                parentId: phrase.parentId ?? "",
                dialogueId: props.dialogue.id,
                color: "#80cbc4"
            }
        }
        return node;
    }
    function transformAnswer(answer: IAnswerModel): RawNodeDatum {
        var node: RawNodeDatum = {
            name: answer.texts[0],
            children: answer.phrases.map(phrase => transformPhrase(phrase)),
            attributes: {
                id: answer.id,
                nodeType: NodeType.Answer,
                parentId: answer.parentId ?? "",
                dialogueId: props.dialogue.id,
                color: "#81d4fa"
            }
        }
        return node;
    }

    useEffect(() => {
        var node: RawNodeDatum = {
            name: props.dialogue.name,
            children: [transformPhrase(props.dialogue.phrase)],
            attributes: {
                id: props.dialogue.id,
                nodeType: NodeType.Dialogue,
                parentId: "",
                dialogueId: props.dialogue.id,
                color: "#ef9a9a"
            }
        }

        setData(node);
    }, [props.dialogue]);

    if (!data) {
        return null;
    }

    return (
        <Box height={1000}  borderColor="primary.main">
            <Tree
                data={data}
                nodeSize={nodeSize}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                pathClassFunc={() => "node__link"}
                renderCustomNodeElement={(dialogueItem) => (
                    <DialogueItemNode
                        customNodeElementProps={dialogueItem}
                        selectedNodeId={selectedNodeId}
                        setSelectedNodeId={setSelectedNodeId}
                    />
                )}
                orientation="vertical"
            />
        </Box>

    );
}