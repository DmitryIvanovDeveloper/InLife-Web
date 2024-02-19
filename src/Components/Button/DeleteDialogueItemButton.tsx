import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import ConfirmToDeleteDialogueItemModalScreen from "../ConfirmToDeleteDialogueItemModalScreen";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { DialogueItemType } from "../GraphTree/DialogueitemType";
import useAnswerQueriesApi from "../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../ThereGame.Api/Queries/PhraseQueriesApi";
import { useSelectDialogueLine } from "../../Data/useDialogueItemSelection";

export interface IDeleteDialogueItemButtonProps {
}

export default function DeleteDialogueItemButton(props: IDeleteDialogueItemButtonProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();

    const onDelete = async (dialogueItemType: DialogueItemType) => {
        setIsDeleting(true);

        if (dialogueItemType == DialogueItemType.Answer) {
            await answerQueriesApi.delete(selectDialogueLine.line.id);
            localStorage.removeItem(selectDialogueLine.line.id);
        }
        if (dialogueItemType == DialogueItemType.Phrase) {

            await phraseQueriesApi.delete(selectDialogueLine.dialogueItemId);
            localStorage.removeItem(selectDialogueLine.dialogueItemId);
        }

        setIsDeleting(false);
    }

    const confirm = (dialogueItemType: DialogueItemType | null) => {
        if (!!dialogueItemType) {
            onDelete(dialogueItemType);
        }

        setIsOpen(false);
    }

    return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            {isDeleting
                ? <CircularProgress color='error' size={20} />
                : <Box>
                    <ConfirmToDeleteDialogueItemModalScreen isOpen={isOpen} confirm={confirm} />
                    <IconButton onClick={() => setIsOpen(true)} sx={{ color: '#c62828' }}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            }

        </Box>

    )
}