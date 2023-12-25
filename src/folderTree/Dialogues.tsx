import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { useDialogueItemConstructor, useDialogues } from '../Data/useDialogues';
import DialogueConstructor from '../constructors/dialogueConstructor/DialogueConstructor';
import { useEffect, useState } from 'react';
import useDialogieQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi';
import CircularProgressCustom from '../components/CircularProgress';
import LocationCarousel from '../components/LocationCarousel';
import { Locations } from '../Data/Locations';
import AppBarCustom from '../components/AppBarCustom';
import Dialogue from './Dialogue';

export interface IDialoguesProps { }

export default function Dialogues(props: IDialoguesProps): JSX.Element | null {
    const dialogueQueriesApi = useDialogieQueriesApi();

    const [dialoguesRecoil, setDialoguesRecoil] = useDialogues();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    const [npcId, setNpcId] = useState<string>("");

    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
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
        await dialogueQueriesApi.create(npcId);
        setIsNewDialogueCreating(false)
    }

    useEffect(() => {
        setNpcId(Locations[0].id ?? '');
        setDialogues(dialoguesRecoil);
    }, [dialoguesRecoil]);

    useEffect(() => {
        setIsNewDialogueCreating(true);

        dialogueQueriesApi.get()
            .then(() => {
                setIsNewDialogueCreating(false);
            });
    }, []);

    if (!npcId) {
        return null;
    }


    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5
            }}

            autoComplete="off" >
            <AppBarCustom
                name={Locations.find(l => l.id == npcId)?.name ?? ''}
            />

            <LocationCarousel setLevel={setNpcId} id={npcId} />

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
                {dialogues
                    .filter(d => d.levelId == npcId)
                    .map(dialogue => (
                       <Dialogue id={dialogue.id}/>
                    ))}
            </TreeView>
        </Box>
    );
}