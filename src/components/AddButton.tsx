import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface IAddButton {
  onCLick: () => void;
}

export default function AddButton(props: IAddButton) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="add" onClick={props.onCLick}>
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
}