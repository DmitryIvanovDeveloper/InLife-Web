import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import Phrase from './Phrase';
import { useDialogueItemConstructor, useDialogues } from '../Data/useDialogues';
import DialogueConstructor from '../constructors/dialogueConstructor/DialogueConstructor';
import { useEffect, useState } from 'react';
import useDialogieQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi';
import CircularProgressCustom from '../components/CircularProgress';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import TextButton from '../components/buttons/TextButton';

export interface IDialoguesProps { }

export default function Dialogues(props: IDialoguesProps): JSX.Element | null {
    const dialogueQueriesApi = useDialogieQueriesApi();

    const [dialoguesRecoil, setDialoguesRecoil] = useDialogues();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [dialogues, setDialogues] = useState(dialoguesRecoil);
    const [isNewDialogueCreating, setIsNewDialogueCreating] = useState<boolean>();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    const createNewDialogue = async () => {
        setIsNewDialogueCreating(true)
        await dialogueQueriesApi.create();
        setIsNewDialogueCreating(false)
    }

    useEffect(() => {
        setDialogues(dialoguesRecoil);
    }, [dialoguesRecoil]);

    const onClick = (id: string) => {
        setDialogueItemConstructor(() => <DialogueConstructor id={id} />);
    }

    useEffect(() => {
        setIsNewDialogueCreating(true);

        dialogueQueriesApi.get()
            .then(() => {
                setIsNewDialogueCreating(false);
            });
    }, []);


    return (
        <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300, overflow: "auto" }} >
            <Box sx={{ mb: 1 }}>
                {
                    isNewDialogueCreating
                        ? <CircularProgressCustom />
                        : <Button onClick={createNewDialogue}>
                            New Dialogue
                        </Button>
                }

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
                {dialogues.map(dialogue => (
                    <Box>
                        <TextButton onClick={() => onClick(dialogue.id)}>
                        <TreeItem
                            key={dialogue.id}
                            nodeId={dialogue.id}
                            label={`${dialogue.name} [D]`}
                        >
                            <Phrase
                                dialogueId={dialogue.id}
                                id={dialogue.phrase.id}
                            />
                        </TreeItem>
                        </TextButton>
                       
                    </Box>
                ))}
            </TreeView>
        </Box>
    );
}