import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { DialogueItemType } from './GraphTree/DialogueitemType';
import { useSelectDialogueLine } from '../Data/useDialogueItemSelection';

export interface IConfirmToDeleteScenarioModalScreenProps {
    isOpen: boolean;
    confirm: (isConfirm: boolean) => void;
    name: string;
}
export default function ConfirmToDeleteScenarioModalScreen(props: IConfirmToDeleteScenarioModalScreenProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                        You're trying to DELETE the '{props.name}' scene. Confirm?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontWeight: '600', color: '#ef5350' }} onClick={() => props.confirm(true)} autoFocus>
                        Agree
                    </Button>
                    <Button sx={{ fontWeight: '600', color: 'white', backgroundColor: 'green' }} onClick={() => props.confirm(false)} autoFocus>
                        Disagree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}