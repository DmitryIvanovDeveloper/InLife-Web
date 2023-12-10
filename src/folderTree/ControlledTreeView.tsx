import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import Phrase from './Phrase.tsx';
import { useDialogues } from '../Data/useDialogues.ts';
import { useSelection as useSelection } from '../Data/useSelection.ts';
import { useEffect } from 'react';

export interface IControlledTreeViewProps {
}

export default function ControlledTreeView(props: IControlledTreeViewProps) {

    const [dialogues] = useDialogues();
    const [selection] = useSelection();
    
    const [expanded, setExpanded] = React.useState<string[]>([...selection]);
    const [selected, setSelected] = React.useState<string[]>([]);
   
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };


  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
    );
  };

   
 

    useEffect(() => {
        setSelected(prev => ({
            ...prev,
            selection
        }));
    }, [selection]);

    if(!dialogues) {
        return;
    }
    return (
        <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <Box sx={{ mb: 1 }}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button>
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
                {dialogues.map(dialogue => (
                    <Phrase
                        dialogueId={dialogue.id}
                        id={dialogue.phrase.id}
                 />
                ))}
            </TreeView>
        </Box>
    );
}