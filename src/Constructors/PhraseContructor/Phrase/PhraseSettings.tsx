import { Grid, CircularProgress, IconButton, Box, Typography, Button } from "@mui/material";
import { EditDialogueItemType } from "../../models/EditType";
import SaveIcon from '@mui/icons-material/Save';
import { useConstructorActionsState } from "../../../Data/useConstructorActionsState";
import { IDialogueItemEditState } from "../../models/IPhraseSettingsState";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MessageIcon from '@mui/icons-material/Message';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import useConstructorActions from "../../../Data/ConstructorActions";
import Message from "../../../Components/ChatElement/Message";
import AudioMessage from "../../../Components/ChatElement/AudioMessage";
import 'react-h5-audio-player/lib/styles.css';

export interface IPhraseTab {
    onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType) => void;
    editDialogueItemType: EditDialogueItemType | undefined;
    dialogueItemEditState: IDialogueItemEditState;
    phraseCaption: string;
    phraseAudio: string;
    name: string
}

export default function PhraseSettings(props: IPhraseTab) {
    const [constructorActionsState] = useConstructorActionsState();
    const constructorActions = useConstructorActions();

    return (
        <Box >
            {constructorActionsState.phrase.isSave
                ? <CircularProgress sx={{ marginTop: "10px" }} size={20} />
                : <Grid display='flex' direction='row' alignItems='center' margin="3px">

                    <Button

                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Phrase)}
                    >
                        Phrase
                        <DriveFileRenameOutlineIcon
                            sx={{
                                color: props.dialogueItemEditState.isPhraseEdited ? commonStyle.editedItemColor : commonStyle.default
                            }}
                        />
                    </Button>

                    <Button

                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Comments)}
                    >
                        Comments
                        <MessageIcon
                            sx={{
                                color: props.dialogueItemEditState.isPhraseCommentsEdited ? commonStyle.editedItemColor : commonStyle.default
                            }}
                        />
                    </Button>
                    <Button

                        onClick={() => props.onEditDialogueItemType(EditDialogueItemType.PhraseTenseses)}
                    >
                        Tenseses
                        <AvTimerIcon
                            sx={{
                                color: props.dialogueItemEditState.isPhraseTensesesEdited ? commonStyle.editedItemColor : commonStyle.default
                            }}
                        />
                    </Button>
                    <IconButton
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
                </Grid>
            }

            <Message
                title={props.name}
                position={"left"}
                type={"text"}
                text={props.phraseCaption}
            />
            {constructorActionsState.phrase.isSave
                ? <Typography>Generating audio by AI...</Typography>
                : <AudioMessage
                    position={"left"}
                    type={"audio"}
                    title={props.name}
                    audioUrl={props.phraseAudio}
                />
            }

        </Box>
    )
}

const commonStyle = {
    editedItemColor: "#ff9800",
    editItemColor: "#fafafa",
    default: "grey"
}