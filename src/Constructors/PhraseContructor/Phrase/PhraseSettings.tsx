import { Grid, CircularProgress, IconButton, Box } from "@mui/material";
import { EditDialogueItemType } from "../../models/EditType";
import SaveIcon from '@mui/icons-material/Save';
import { useConstructorActionsState } from "../../../Data/useConstructorActionsState";
import { IDialogueItemEditState } from "../../models/IPhraseSettingsState";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MessageIcon from '@mui/icons-material/Message';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import useConstructorActions from "../../../Data/ConstructorActions";
import AudioPlayer from "react-h5-audio-player";
import { useEffect, useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import Message from "../../../Components/ChatElement/Message";
import AudioMessage from "../../../Components/ChatElement/AudioMessage";

export interface IPhraseTab {
    onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType) => void;
    editDialogueItemType: EditDialogueItemType | undefined;
    dialogueItemEditState: IDialogueItemEditState;
    phraseCaption: string;
    phraseAudio: string;
}

export default function PhraseSettings(props: IPhraseTab) {
    const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();

    return (
        <Box >
            {constructorActionsState.phrase.isSave
                ? <CircularProgress sx={{ marginTop: "10px" }} size={20} />
                : <Grid display='flex' direction='row' alignItems='center' margin="3px">

                    <IconButton
                        sx={{
                            backgroundColor: props.editDialogueItemType == EditDialogueItemType.Phrase ? commonStyle.editItemColor : "",
                            color: props.dialogueItemEditState.isPhraseEdited ? commonStyle.editedItemColor : ""
                        }}
                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Phrase)}
                    >
                        <DriveFileRenameOutlineIcon />
                    </IconButton>

                    <IconButton
                        sx={{
                            backgroundColor: props.editDialogueItemType == EditDialogueItemType.Comments ? commonStyle.editItemColor : "",
                            color: props.dialogueItemEditState.isPhraseCommentsEdited ? commonStyle.editedItemColor : ""
                        }}
                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Comments)}
                    >
                        <MessageIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: props.editDialogueItemType == EditDialogueItemType.PhraseTenseses ? commonStyle.editItemColor : "",
                            color: props.dialogueItemEditState.isPhraseTensesesEdited ? commonStyle.editedItemColor : ""
                        }}
                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.PhraseTenseses)}
                    >
                        <AvTimerIcon />
                    </IconButton>
                    {props.editDialogueItemType == EditDialogueItemType.Phrase ||
                        props.editDialogueItemType == EditDialogueItemType.PhraseTenseses ||
                        props.editDialogueItemType == EditDialogueItemType.Comments
                        ? <IconButton
                            sx={{
                                color: props.dialogueItemEditState.isPhraseCommentsEdited ||
                                    props.dialogueItemEditState.isPhraseEdited ||
                                    props.dialogueItemEditState.isPhraseTensesesEdited
                                    ? commonStyle.editedItemColor
                                    : ""
                            }}

                            onClick={() => constructorActions.setIsSavePhrase(true)}
                        >
                            <SaveIcon />
                        </IconButton>
                        : null
                    }
                </Grid>
            }

            <Message
                title={``}
                position={"left"}
                type={"text"}
                text={props.phraseCaption}
            />
            <AudioMessage
                position={"left"}
                type={"audio"}
                title={"Emre"}
                audioUrl={props.phraseAudio}
            />
        </Box>

    )
}

const commonStyle = {
    editedItemColor: "#ff9800",
    editItemColor: "#fafafa",
    default: ""
}