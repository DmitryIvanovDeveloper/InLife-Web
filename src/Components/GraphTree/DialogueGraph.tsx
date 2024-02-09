import { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps, RawNodeDatum } from "react-d3-tree";
import { useDialogue } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemNode } from "./DialogueItemNode";
import { NodeType } from "./DialogueitemType";
import { Resizable } from 're-resizable';


<Resizable
    defaultSize={{
        width: 320,
        height: 200,
    }}
></Resizable>


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
                parentId: phrase.parentId,
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
                possibleAnswersLength: answer.texts.length,
                id: answer.id,
                nodeType: NodeType.Answer,
                parentId: answer.parentId,
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
                color: "#ef9a9a",
            }
        }

        setData(node);
    }, [diaologueRecoil]);

    function node(dialogueItem: CustomNodeElementProps) {
        if (!diaologueRecoil.voiceSettings &&
            dialogueItem.nodeDatum.attributes?.nodeType == NodeType.Dialogue) {
            return <DialogueItemNode customNodeElementProps={dialogueItem}
            />
        }
        if (!!diaologueRecoil.voiceSettings)
        {
            return <DialogueItemNode customNodeElementProps={dialogueItem} />
        }

        return <div />
    }
    if (!data) {
        return null;
    }
    return (
        <Resizable
            defaultSize={{
                width: "100%",
                height: "60%"
            }}
        >
            <div style={{ backgroundColor: "#e1f5fe", borderRadius: 15, height: "100%"}}>
                <Tree
                    data={data}
                    nodeSize={nodeSize}
                    translate={{ x: 350, y: 50 }}
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                    pathClassFunc={() => "node__link"}
                    renderCustomNodeElement={(dialogueItem) => {
                        return node(dialogueItem);
                    }}
                    orientation="vertical"
                />
            </div>
        </Resizable>


    )
}