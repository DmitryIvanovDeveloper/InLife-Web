import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import INpc, { Locations } from '../../Data/Locations';
import { Box } from '@mui/material';

export interface INpcListProps {
    onSelectNpc: (npc: INpc) => void;
}
export default function NpcList(props: INpcListProps) {
    return (
        <List dense sx={{ 
            maxHeight: "100%", 
            width: '100%', 
            bgcolor: 'background.paper' , 
            overflow: 'auto' 
        }}>
            <ListItem
                disablePadding
                
            >
                <Box display='flex' flexDirection='column' width='100%'>
                    {Locations.map((location) => (
                        <ListItemButton 
                            onClick={() => props.onSelectNpc(location)}
                            sx={{ borderRadius: 2}}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{margin: 0, height: 50, width: 50}}
                                    src={location.image}
                                />
                            </ListItemAvatar>
                            <ListItemText sx={{ml: 2}} id={location.id} primary={`${location.name}`} />
                        </ListItemButton>
                    ))}
                </Box>
            </ListItem>
        </List>
    );
}