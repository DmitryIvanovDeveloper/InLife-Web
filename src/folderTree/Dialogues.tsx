import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import Phrase from './Phrase.tsx';
import { useDialogueItemConstructor, useDialogues } from '../Data/useDialogues.ts';
import { useSelection as useSelection } from '../Data/useSelection.ts';
import { Typography } from '@mui/material';
import DialogueConstructor from '../constructors/dialogueConstructor/DialogueConstructor.tsx';
import { useEffect, useState } from 'react';
import useDialogieQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi.ts';

export interface IDialoguesProps {
}

export default function Dialogues(props: IDialoguesProps) {
    const dialogueQueriesApi = useDialogieQueriesApi();

    const [dialogues, setDialogues] = useDialogues();
    const [selection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [dialoguesTree, setDialoguesTree] = useState(dialogues);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    const createNewDialogue = async () => {
        await dialogueQueriesApi.create();
    }

    useEffect(() => {
        setDialoguesTree(dialogues);
    }, [dialogues]);

    const onclick = (id: string) => {
        setDialogueItemConstructor(() => <DialogueConstructor id={id} />);
    }

    useEffect(() => {
        dialogueQueriesApi.get();
    }, []);

    if (!dialogues) {
        return;
    }
    return (
        <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300, overflow: "auto" }} >
            <Box sx={{ mb: 1 }}>
                <Button onClick={createNewDialogue}>
                    New Dialogue
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
                onNodeSelect={handleSelect}
                multiSelect
            >
                {dialoguesTree.map(dialogue => (
                    <Box>
                        <Button onClick={() => onclick(dialogue.id)}>
                            <Typography sx={{ textDecoration: 'underline' }}>{dialogue.name}</Typography>
                        </Button>
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