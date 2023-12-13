import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import Phrase from './Phrase.tsx';
import { useDialogueItemConstructor, useDialogues } from '../Data/useDialogues.ts';
import { useSelection as useSelection } from '../Data/useSelection.ts';
import { IDialogueModel } from '../ThreGame.Business/Models/IDialogueModel.ts';
import { Typography } from '@mui/material';
import DialogueConstructor from '../constructors/dialogueConstructor/DialogueConstructor.tsx';
import ThereGameWebApi from '../ThereGame.Api/ThereGameWebApi.ts';
import { useEffect, useState } from 'react';

export interface IControlledTreeViewProps {
}

export default function ControlledTreeView(props: IControlledTreeViewProps) {

    const [dialogues, setDialogues] = useDialogues();
    const [selection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [dialoguesTree, setDialoguesTree] = useState(dialogues);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };


    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? [] : [],
        );
    };

    const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? [] : [],
        );
    };

    const createNewDialogue = () => {
        const newDialogues = JSON.parse(JSON.stringify(dialogues));
        const newDialogue: IDialogueModel = {
            id: '65079c83-07b7-412a-98fe-8ce5rr239e7',
            name: 'Pidr Theory',
            phrase: {
                parentId: '65079c83-07b7-412a-98fe-8ce5c7a239e7',
                text: 'New Dialogue Phrase',
                answers: [],
                tensesList: [],
                comments: '',
                id: '5645656-6656-412a-98fe-8ce5c7a22111'
            }
        }
        
        newDialogues.push(newDialogue);
        setDialogues(newDialogues);
    }

    const get = async () => {
        const newDialogues = JSON.parse(JSON.stringify(dialogues));

        new ThereGameWebApi().Get("65079c83-07b7-412a-98fe-8ce5c7a239e7")
            .then(response => setDialogues([...newDialogues, response]));
        ;
    }

    useEffect(() => {
        setDialoguesTree(dialogues);
    }, [dialogues]);

    const onclick = (id: string) => {
        setDialogueItemConstructor(() => <DialogueConstructor id={id}/>);
    }

    if (!dialogues) {
        return;
    }
    return (
        <Box sx={{ minHeight: 270, height:"400px", flexGrow: 1, maxWidth: 300, overflow: "auto"}} >
            <Box sx={{ mb: 1 }}>
                <Button onClick={createNewDialogue}>
                    New Dialogue
                </Button>
                <Button onClick={get}>
                    Get
                </Button>
                {/* <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button> */}
            </Box>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelectClick}
                multiSelect
            >
                {dialoguesTree.map(dialogue => (
                    <Box>
                        <Button onClick={() => onclick(dialogue.id)}><Typography sx={{textDecoration: 'underline'}}>{dialogue.name}</Typography></Button>
                        <Phrase
                            dialogueId={dialogue.id}
                            id={dialogue.phrase.id}
                        />
                    </Box>

                ))}
            </TreeView>
        </Box>
    );
}