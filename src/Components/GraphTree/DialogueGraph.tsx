import { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps, RawNodeDatum } from "react-d3-tree";
import { useDialogue } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemNode } from "./DialogueItemNode";
import { DialogueItemType } from "./DialogueitemType";
import { Resizable } from 're-resizable';
import { IDialogueItemColorsMap, useDialogueItemColorsMap } from "../../Data/useDialogueItemColors";

export interface IDialoguesGraphProps {
    dialogueId: string;
}

export default function DialogueGraph(props: IDialoguesGraphProps) {
    const [data, setData] = useState<RawNodeDatum>();
    const nodeSize = { x: 200, y: 200 };
    const [_, setDualogueItemsColorMap] = useDialogueItemColorsMap();
    const diaologueRecoil = useDialogue(props.dialogueId);


    var selectedColors: string[] = [];
    var colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#3f51b5",
        "#2196f3",
        "#009688",
        "#4caf50",
        "#ff9800",
        "#e64a19",
        "#5d4037",
        "#757575",
    ]
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
      }
    const generateColor = () => {
        return randomColor();
    };


    function transformPhrase(phrase: IPhraseModel): RawNodeDatum {

        var node: RawNodeDatum = {
            name: phrase.text,
            children: phrase.answers.map(answer => transformAnswer(answer)),
            attributes: {
                id: phrase.id,
                nodeType: DialogueItemType.Phrase,
                parentId: phrase.parentId,
                dialogueId: diaologueRecoil.id,
            }
        }
        return node;
    }

  
    function transformAnswer(answer: IAnswerModel): RawNodeDatum {

        const itemColor: IDialogueItemColorsMap = {
            id: answer.id,
            color: generateColor()
        }

        setDualogueItemsColorMap(prev => [...prev, itemColor]);

        var node: RawNodeDatum = {
            name: answer.texts[0],
            children: answer.phrases.map(phrase => transformPhrase(phrase)),
            attributes: {
                possibleAnswersLength: answer.texts.length,
                id: answer.id,
                nodeType: DialogueItemType.Answer,
                parentId: answer.parentId,
                dialogueId: diaologueRecoil.id,
            }
        }
        return node;
    }

    useEffect(() => {
        var node: RawNodeDatum = {
            name: "",
            children: [transformPhrase(diaologueRecoil.phrase)],
            attributes: {
                id: diaologueRecoil.id,
                nodeType: DialogueItemType.Dialogue,
                parentId: "",
                dialogueId: diaologueRecoil.id,
            }
        }

        setData(node);
    }, [diaologueRecoil]);

    function node(dialogueItem: CustomNodeElementProps) {
        if (!diaologueRecoil.voiceSettings &&
            dialogueItem.nodeDatum.attributes?.nodeType == DialogueItemType.Dialogue) {

            return <DialogueItemNode customNodeElementProps={dialogueItem}
            />

        }
        if (!!diaologueRecoil.voiceSettings) {
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
                height: "80vh"
            }}
        >
            <div
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 5px",
                    borderRadius: 15,
                    height: "100%",
                    backgroundColor: "#e0f7fa",
                }}>
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