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

export interface IConfirmToDeleteDialogueItemModalScreen {
    isOpen: boolean;
    confirm: (dialogueItemType: DialogueItemType | null) => void;
}
export default function ConfirmToDeleteDialogueItemModalScreen(props: IConfirmToDeleteDialogueItemModalScreen) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectDialogueLine, setSelectDialogieLine] = useSelectDialogueLine();

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={props.isOpen}
                onClose={() => props.confirm(null)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Dialogue Service"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You're trying to DELETE dialogue item! Confirm?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontWeight: '600', color: '#ef5350' }} autoFocus onClick={() => props.confirm(DialogueItemType.Phrase)}>
                        Phrase
                    </Button>
                    <Button sx={{ fontWeight: '600', color: '#ef5350' }} onClick={() => props.confirm(DialogueItemType.Answer)} autoFocus>
                        [{selectDialogueLine.line.name}]
                    </Button>
                    <Button sx={{ fontWeight: '600', color: 'white', backgroundColor: 'green' }} onClick={() => props.confirm(null)} autoFocus>
                        Disagree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}