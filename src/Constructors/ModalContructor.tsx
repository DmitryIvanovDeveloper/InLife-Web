import { Dialog, DialogTitle, DialogActions, useMediaQuery, useTheme, Button, DialogContent, DialogContentText, IconButton, Typography, Box, Avatar } from "@mui/material"
import React, { useEffect, useState } from "react"
import Instruction from "./Instruction";
import { EditDialogueItemType } from "./models/EditType";
import { useConstructorActionsState } from "../Data/useConstructorActionsState";
import { Locations } from "../Data/Locations";
import useConstructorActions from "../Data/ConstructorActions";
import VocabularyBlockWordsContext from "../Components/VocabularyBlockWordsContext/VocabularyBlockWordsContext";

export interface IInstructionProps {
    element: React.ReactElement;
    isOpen: boolean;
    editDialogueItemType: EditDialogueItemType | undefined
    onClose: () => void,
    description?: string,
    avatar?: string
    specificButtonName?: string;
}
export default function ModalConstructor(props: IInstructionProps) {
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isInstructionOpen, setIsInstructionOpen] = useState<boolean>(false);
    const [actionsState] = useConstructorActionsState();
    
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
            <VocabularyBlockWordsContext dialogueId={actionsState.selectedNpc.scenarioId} />
            
            <Box sx={{ ml: 3, mt: 3, mr: 3 }} display='flex' justifyContent='space-between'>
                <Box display='flex' justifyContent='flex-start' alignItems='center'>
                    <Avatar sx={{ width: '100px', height: '100px' }} src={Locations.find(npc => npc.id == actionsState.selectedNpc.id)?.avatar} />
                    <Typography sx={{ ml: 1, mr: 1 }} variant="h6">{props.description}</Typography>
                </Box>
            </Box>
            <Instruction
                editDialogueItemType={props.editDialogueItemType}
                isOpen={isInstructionOpen}
                onClose={() => setIsInstructionOpen(false)}
            />
            <DialogContent >
                <DialogContentText>
                    {props.element}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} autoFocus>
                    {!props.specificButtonName ? 'Done' : props.specificButtonName}
                </Button>
            </DialogActions>
        </Dialog>
    )
}