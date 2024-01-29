import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';

export interface IConfirmToDeleteModalScreen {
  isOpen: boolean;
  confirm: (isConfirm: boolean) => void;
}
export default function ConfirmToDeleteModalScreen(props: IConfirmToDeleteModalScreen) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={() => props.confirm(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Dialogue Service"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're trying to DELETE! Confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.confirm(false)}>
            Disagree
          </Button>
          <Button onClick={() => props.confirm(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}