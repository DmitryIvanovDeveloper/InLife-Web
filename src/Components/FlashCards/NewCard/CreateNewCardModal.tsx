import { Dialog, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Button } from "@mui/material";
import { useState } from "react";
import NewCard from "./NewCard";
import { useWordsState } from "../../../Data/useWords";

export interface ICreateNewCardModalProps {
    onClose: () => void;
    editCardId?: string;
}

export default function CreateNewCardModal(props: ICreateNewCardModalProps) {
    const [editCardId] = useState<string>("");
    const [wordsState] = useWordsState();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        
    return (
        <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "900px",  // Set your width here
                },
            },
        }}
    >
        <DialogContent >
            <DialogContentText>
                <NewCard
                    cardData={wordsState.find(flashCard => flashCard.id == props.editCardId)}
                    onClose={props.onClose}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} autoFocus>
                Close
            </Button>
        </DialogActions>
    </Dialog>
    )
}