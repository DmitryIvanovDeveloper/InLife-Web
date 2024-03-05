import { Box, Button, CircularProgress, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { EditDialogueItemType } from "../models/EditType";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import { IDialogueItemEditState } from "../models/IPhraseSettingsState";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TranslateIcon from '@mui/icons-material/Translate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import SaveIcon from '@mui/icons-material/Save';
import Message from "../../Components/ChatElement/Message";
import useConstructorActions from "../../Data/ConstructorActions";

export interface IAnswersActionsButtonsProps {
   onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType) => void;
   editDialogueItemType: EditDialogueItemType | undefined;
   dialogueItemEditState: IDialogueItemEditState;
   currentDialogueLineData: string[];
   color: string;
}

export default function DialogueLineSettings(props: IAnswersActionsButtonsProps) {
   const [constructorActionsState] = useConstructorActionsState();
   const constructorActions = useConstructorActions();

   return (
      <Box display='flex' flexDirection='column' alignItems='flex-end'>
         {constructorActionsState.answer.isSave
            ? <CircularProgress size={20} />
            : <Grid
               display='flex' direction='row' alignItems='center'
            >
               <Button
                  sx={{ color: commonStyle.default }}
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Answers)}>
                  Answers
                  <DriveFileRenameOutlineIcon
                     sx={{
                        color: props.dialogueItemEditState.isAnswersEdited ? commonStyle.editedItemColor : props.color
                     }}
                  />
               </Button>
               <Button
                  sx={{ color: commonStyle.default }}

                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Translates)}>
                  Translates
                  <TranslateIcon
                     sx={{
                        color: props.dialogueItemEditState.isAnswersTranslatesEdited ? commonStyle.editedItemColor : props.color
                     }}
                  />
               </Button>
               <Button
                  sx={{ color: commonStyle.default }}

                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                  Tenseses
                  <AvTimerIcon
                     sx={{
                        color: props.dialogueItemEditState.isAnswersTensesListEdited ? commonStyle.editedItemColor : props.color
                     }}
                  />
               </Button>
               <Button
                  sx={{ color: commonStyle.default }}

                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.PossibleWords)}>
                  Words
                  <SpellcheckIcon
                     sx={{
                        color: props.dialogueItemEditState.isAnswersPossibleWordsEdited ? commonStyle.editedItemColor : props.color
                     }} />
               </Button>
               <IconButton
                  sx={{
                     color: props.dialogueItemEditState.isAnswersEdited ||
                        props.dialogueItemEditState.isAnswersTranslatesEdited ||
                        props.dialogueItemEditState.isAnswersTensesListEdited ||
                        props.dialogueItemEditState.isAnswersPossibleWordsEdited
                        ? commonStyle.editedItemColor
                        : ""
                  }}
                  onClick={() => constructorActions.setIsSaveAnswer(true)}>

                  <SaveIcon />
               </IconButton>
            </Grid>
         }
         <List sx={{ width: '100%', height: "225px", overflowY: 'auto' }}>
            {props.currentDialogueLineData.map(answer => (
                <Message
                title={`student [possible answer]`}
                position={"right"}
                type={"text"}
                text={answer}
             />
            ))}
         </List>
      </Box>
   )
}

const commonStyle = {
   editedItemColor: "#ff9800",
   editItemColor: "#fafafa",
   default: "grey"
}