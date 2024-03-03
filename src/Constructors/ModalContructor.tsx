import { Dialog, DialogTitle, DialogActions, useMediaQuery, useTheme, Button, DialogContent, DialogContentText, IconButton, Typography, Box, Avatar } from "@mui/material"
import React, { useState } from "react"
import Instruction from "./Instruction";
import { EditDialogueItemType } from "./models/EditType";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export interface IInstructionProps {
    element: React.ReactElement;
    isOpen: boolean;
    editDialogueItemType: EditDialogueItemType | undefined
    onClose: () => void,
    description?: string,
    avatar?: string
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
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "800px",  // Set your width here
                      },
                    },
                  }}
            >
                <DialogTitle textAlign='end' id="responsive-dialog-title">
                    <Box display='flex' justifyContent='space-between'>
                    <Box  display='flex' justifyContent='space-between' alignItems='center'>
                        <Avatar src={props.avatar} />
                        <Typography sx={{ml: 1, mr: 1}} variant="h6">{props.description}</Typography>
                    </Box>
                   
                    <Button onClick={() => setIsInstructionOpen(true)}>  About<HelpOutlineIcon /></Button>

                    </Box>
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