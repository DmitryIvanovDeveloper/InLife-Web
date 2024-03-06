import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { IconButton, List } from '@mui/material';

export default function VirtualizedList() {

  return (
    <List sx={{ width: '100%', maxWidth: 360, }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
        
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}