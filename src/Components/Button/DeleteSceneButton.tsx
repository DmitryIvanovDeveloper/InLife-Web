import { Box, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmToDeleteScenarioModalScreen from "../ConfirmToDeleteScenarioModalScreen";
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import useConstructorActions from "../../Data/ConstructorActions";
import { useSelectDialogueLine } from "../../Data/useDialogueItemSelection";

export interface IDeleteDialogueItemButtonProps {
    dialogueId: string;
    name: string;
    onDelete: () => void;
}

export default function DeleteSceneButton(props: IDeleteDialogueItemButtonProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const actions = useConstructorActions();
    const [_, setSelectDialogueLine] = useSelectDialogueLine();

    const dialogueQueriesApi = useDialogueQueriesApi();

    const onDelete = async () => {
        setIsDeleting(true);
        await dialogueQueriesApi.delete(props.dialogueId);
        props.onDelete();
        setSelectDialogueLine({
            dialogueItemId: "",
            line: {
                id: "",
                name: ""
            },
            nextDialogueItemId: ""
        });
        actions.setSpecificPhrase("");
        actions.setSelectedScenario("");
        setIsDeleting(false)
    }


    const confirm = (isDelete: boolean) => {
        if (isDelete) {
            onDelete()
        }

        setIsOpen(false);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
            {isDeleting
                ? <CircularProgress color='error' size={20} />
                : <Box>
                    <ConfirmToDeleteScenarioModalScreen isOpen={isOpen} confirm={confirm} name={props.name} />
                    <IconButton onClick={() => setIsOpen(true)} sx={{ color: '#c62828' }}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            }

        </Box>
    )
}