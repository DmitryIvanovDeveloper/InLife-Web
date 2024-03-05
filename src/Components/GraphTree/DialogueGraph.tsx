import { useEffect, useState } from "react";
import Tree, { CustomNodeElementProps, RawNodeDatum } from "react-d3-tree";
import { useDialogue } from "../../Data/useDialogues";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";
import { DialogueItemNode } from "./DialogueItemNode";
import { DialogueItemType } from "./DialogueitemType";
import { IDialogueItemColorsMap, useDialogueItemColorsMap } from "../../Data/useDialogueItemColors";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import MarkPurple from '../../Images/Marks/Mark Purple.png';
import MarkRed from '../../Images/Marks/Mark Red.png';
import MarkSkyBlue from '../../Images/Marks/Mark SkyBlue.png';
import Green from '../../Images/Marks/Mark Green.png';
import Yellow from '../../Images/Marks/Mark Yellow.png';
import Blue from '../../Images/Marks/Mark Blue.png';
import Orange from '../../Images/Marks/Mark Orange.png';
import useConstructorActions from "../../Data/ConstructorActions";

export interface IDialoguesGraphProps {
}

export default function DialogueGraph(props: IDialoguesGraphProps) {
    const [actionState] = useConstructorActionsState();
    const actions = useConstructorActions();
    const diaologueRecoil = useDialogue(actionState.selectedNpc.scenarioId);

    const [data, setData] = useState<RawNodeDatum>();
    const nodeSize = { x: 200, y: 220 };
    const [_, setDualogueItemsColorMap] = useDialogueItemColorsMap();

    var usedMarks: string[] = [];

    var marks: string[] = [
        MarkPurple,
        MarkRed,
        MarkSkyBlue,
        Green,
        Yellow,
        Blue,
        Orange,
    ]

    function getRandomMark(): string {
        var num = Math.floor(Math.random() * marks.length);
        var randomMark = marks[num];

        if (marks.length == usedMarks.length) {
            usedMarks = [];
        }
        
        if (usedMarks.includes(randomMark)) {

            return getRandomMark();
        }

        usedMarks.push(randomMark);
        return marks[num];
    }
  
    useEffect(() => {
        if (!data || !diaologueRecoil) {
            return;
        }
        actions.setSpecificPhrase(diaologueRecoil.phrase.id);
    }, [data])


    function transformPhrase(phrase: IPhraseModel): RawNodeDatum {
        var node: RawNodeDatum = {
            name: phrase?.text,
            children: phrase?.answers.map(answer => transformAnswer(answer)),
            attributes: {
                id: phrase?.id,
                nodeType: DialogueItemType.Phrase,
                parentId: phrase?.parentId,
                dialogueId: diaologueRecoil?.id,
            }
        }
        return node;
    }


    function transformAnswer(answer: IAnswerModel): RawNodeDatum {

        const itemColor: IDialogueItemColorsMap = {
            id: answer?.id,
            color: getRandomMark()
        }

        setDualogueItemsColorMap(prev => [...prev, itemColor]);

        var node: RawNodeDatum = {
            name: answer.texts[0],
            children: answer.phrases.map(phrase => transformPhrase(phrase)),
            attributes: {
                possibleAnswersLength: answer.texts.length,
                id: answer?.id,
                nodeType: DialogueItemType.Answer,
                parentId: answer?.parentId,
                dialogueId: diaologueRecoil?.id,
            }
        }
        return node;
    }

    useEffect(() => {
        var node: RawNodeDatum = {
            name: "",
            children: [transformPhrase(diaologueRecoil?.phrase)],
            attributes: {
                id: diaologueRecoil?.id,
                nodeType: DialogueItemType.Dialogue,
                parentId: "",
                dialogueId: diaologueRecoil?.id,
                name: diaologueRecoil.name,
            }
        }

        setData(node);
    }, [diaologueRecoil]);

    function node(dialogueItem: CustomNodeElementProps) {
        if (!diaologueRecoil?.voiceSettings &&
            dialogueItem.nodeDatum.attributes?.nodeType == DialogueItemType.Dialogue) {

            return <DialogueItemNode customNodeElementProps={dialogueItem}
            />

        }
        if (!!diaologueRecoil?.voiceSettings) {
            return <DialogueItemNode customNodeElementProps={dialogueItem} />
        }

        return <div />
    }

    if (!data) {
        return null;
    }

    return (
        <Tree
            data={data}
            nodeSize={nodeSize}
            translate={{ x: 550, y: 50 }}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            pathClassFunc={() => "node__link"}
            zoom={1}
            renderCustomNodeElement={(dialogueItem) => {
                return node(dialogueItem);
            }}
            orientation="vertical"
        />
    )
}