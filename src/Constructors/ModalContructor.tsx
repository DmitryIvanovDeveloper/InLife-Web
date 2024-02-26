import { Dialog, DialogTitle, DialogActions, useMediaQuery, useTheme, Button, DialogContent, DialogContentText, IconButton } from "@mui/material"
import React, { useState } from "react"
import Instruction from "./Instruction";
import { EditDialogueItemType } from "./models/EditType";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export interface IInstructionProps {
    element: React.ReactElement;
    isOpen: boolean;
    editDialogueItemType: EditDialogueItemType | undefined
    onClose: () => void
}
export default function ModalConstructor(props: IInstructionProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);
    
    return (
            <Dialog
                fullScreen={fullScreen}
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle textAlign='end' id="responsive-dialog-title">
                  
                    <Button onClick={() => setIsInstructionOpen(true)}>  About<HelpOutlineIcon /></Button>
                    <Instruction 
                        editDialogueItemType={props.editDialogueItemType} 
                        isOpen={isInstructionOpen} 
                        onClose={() => setIsInstructionOpen(false)} 
                    />
                </DialogTitle>
                <DialogContent >
                <DialogContentText>
                    {props.element}
                </DialogContentText>
            </DialogContent>
                <DialogActions>
                    <Button  onClick={props.onClose} autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
    )
}