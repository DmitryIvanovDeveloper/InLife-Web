import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { useDialogueItemConstructor, useDialogues } from '../Data/useDialogues';
import { useEffect, useState } from 'react';
import useDialogieQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi';
import LinarProgressCustom from '../components/CircularProgress';
import LocationCarousel from '../components/LocationCarousel';
import { Locations } from '../Data/Locations';
import AppBarCustom from '../components/AppBarCustom';
import Dialogue from './Dialogue';
import { useUser } from '../Data/useUser';
import { IDialogueModel } from '../ThereGame.Business/Models/IDialogueModel';
import { useTreeState } from '../Data/useTreeState';

export interface IDialoguesProps { }

export default function Dialogues(props: IDialoguesProps): JSX.Element | null {
    const dialogueQueriesApi = useDialogieQueriesApi();
    const [treeState, setTreeState] = useTreeState();

    const [user] = useUser();

    const [npcId, setNpcId] = useState<string>(Locations[0].id ?? '');

    const [dialogues, setDialogues] = useState<IDialogueModel[]>(user?.dialogues ?? []);
    const [isNewDialogueCreating, setIsNewDialogueCreating] = useState<boolean>();

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setTreeState(prev => ({
            ...prev,
            expanded: nodeIds
        }))
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setTreeState(prev => ({
            ...prev,
            selected: nodeIds
        }))
    };

    const createNewDialogue = async () => {
        setIsNewDialogueCreating(true)
        await dialogueQueriesApi.create(npcId);
        setIsNewDialogueCreating(false)
    }

    useEffect(() => {
        if (!npcId) {
            return;
        }

        setDialogues(user?.dialogues.filter(d => d.levelId == npcId) ?? []);
    }, [npcId, user]);

    if (!npcId) {
        return null;
    }


    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 800,
                overflow: "hidden",
                overflowY: "scroll",
            }}

            autoComplete="off" >
            <AppBarCustom
                name={Locations.find(l => l.id == npcId)?.name ?? ''}
            />

            <LocationCarousel setLevel={setNpcId} id={npcId} />

            <Box>
                {isNewDialogueCreating
                    ? <LinarProgressCustom name='Creating'/>
                    : <Button 
                        fullWidth
                        variant='contained'
                        onClick={createNewDialogue}>
                        New Dialogue
                    </Button>
                }
            </Box>
                
            <TreeView
                aria-label="controlled"
                
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={treeState.expanded}
                selected={treeState.selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
            >
                {dialogues
                    
                    .map(dialogue => (
                        <Dialogue id={dialogue.id} />
                    ))}
            </TreeView>
        </Box>
    );
}