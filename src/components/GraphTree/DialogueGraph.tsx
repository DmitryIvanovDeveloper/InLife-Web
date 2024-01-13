import React, { useEffect, useState } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import { DialogueItemNode } from "./DialogueItemNode";
import { NodeType } from "./DialogueitemType";
import { useDialogue } from "../../Data/useDialogues";
import { useSelection } from "../../Data/useSelection";


export interface IDialoguesGraphProps {
    dialogueId: string
}

export default function DialogueGraph(props: IDialoguesGraphProps) {
    const [data, setData] = useState<RawNodeDatum>();
    const nodeSize = { x: 200, y: 200 };

    const diaologueRecoil = useDialogue(props.dialogueId);

    function transformPhrase(phrase: IPhraseModel): RawNodeDatum {
        var node: RawNodeDatum = {
            name: phrase.text,
            children: phrase.answers.map(answer => transformAnswer(answer)),
            attributes: {
                id: phrase.id,
                nodeType: NodeType.Phrase,
                parentId: phrase.parentId ?? "",
                dialogueId: diaologueRecoil.id,
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
                dialogueId: diaologueRecoil.id,
                color: "#81d4fa"
            }
        }
        return node;
    }

    useEffect(() => {
        var node: RawNodeDatum = {
            name: diaologueRecoil.name,
            children: [transformPhrase(diaologueRecoil.phrase)],
            attributes: {
                id: diaologueRecoil.id,
                nodeType: NodeType.Dialogue,
                parentId: "",
                dialogueId: diaologueRecoil.id,
                color: "#ef9a9a"
            }
        }

        setData(node);
    }, [diaologueRecoil]);

    if (!data) {
        return null;
    }

    return (
        <div  style={{backgroundColor: "#e1f5fe", height: 1000, borderRadius: 15}}>
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
                    />
                )}
                orientation="vertical"
            />
        </div>

    );
}