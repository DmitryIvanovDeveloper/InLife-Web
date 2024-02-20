import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import INpc, { Locations } from '../../Data/Locations';
import { Box } from '@mui/material';
import { useDialogues } from '../../Data/useDialogues';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export interface INpcListProps {
    onSelectNpc: (npc: INpc) => void;
}
export default function NpcList(props: INpcListProps) {
    const [dialoguesRecoil] = useDialogues();

    const countDialogues = (npc: INpc) => {
        return dialoguesRecoil.filter(d => d.levelId == npc.id).length;
    };

    return (
        <List dense sx={{
            bgcolor: 'background.paper',
            overflow: 'scroll',
            height: "90vh"
        }}>
            <ListItem
                disablePadding

            >
                <Box display='flex' flexDirection='column' width='100%'>
                    {Locations.map((location) => (
                        <ListItemButton
                            onClick={() => props.onSelectNpc(location)}
                            sx={{ borderRadius: 2 }}
                        >

                            <ListItemAvatar>
                                <Avatar
                                    style={{ margin: 0, height: 50, width: 50 }}
                                    src={location.avatar}
                                />

                            </ListItemAvatar>
                            <Box display='flex' justifyContent='end' sx={{ width: "100%" }}>

                                <ListItemText sx={{ ml: 2 }} id={location.id} primary={`${location.name}`} />
                                <Box  display='flex' flexDirection='row' justifyContent='end'>
                                    <ForumOutlinedIcon color='info' />
                                    <ListItemText sx={{ ml: 2 }} id={location.id} primary={countDialogues(location)} />
                                </Box>
                            </Box>

                        </ListItemButton>
                    ))}
                </Box>
            </ListItem>
        </List>
    );
}