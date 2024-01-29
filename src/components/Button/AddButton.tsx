import { Button } from '@mui/material';

export interface IAddButton {
  onClick: () => void;
  name: string;
}

export default function AddButton(props: IAddButton) {
  return (
    <Button
        variant="contained"
        sx={{
            position: "relative",
            fontWeight: 700,
        }}
        onClick={props.onClick}
    >
        {props.name}
    </Button>
  );
}