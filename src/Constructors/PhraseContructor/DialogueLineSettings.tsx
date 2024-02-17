import { Box, CircularProgress, Grid, IconButton } from "@mui/material";
import { EditDialogueItemType } from "../models/EditType";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import { IDialogueItemEditState } from "../models/IPhraseSettingsState";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TranslateIcon from '@mui/icons-material/Translate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import SaveIcon from '@mui/icons-material/Save';
import ChatElement from "../../Components/ChatElement/ChatElement";
import useConstructorActions from "../../Data/ConstructorActions";

export interface IAnswersActionsButtonsProps {
   onEditDialogueItemType: (editDIalogueItemType: EditDialogueItemType) => void;
   editDialogueItemType: EditDialogueItemType | undefined;
   dialogueItemEditState: IDialogueItemEditState;
   currentDialogueLineData: string[];
}

export default function DialogueLineSettings(props: IAnswersActionsButtonsProps) {

   const [constructorActionsState, setConstructorActionsState] = useConstructorActionsState();
   const constructorActions = useConstructorActions();
   

   return (
      <Box display='flex' flexDirection='column' alignItems='flex-end'>
         {constructorActionsState.answer.isSave
            ? <CircularProgress size={20} />
            : <Grid
               display='flex' direction='row' alignItems='center'
            >
               <IconButton
                  sx={{
                     backgroundColor: props.editDialogueItemType == EditDialogueItemType.Answers ? commonStyle.editItemColor : "",
                     color: props.dialogueItemEditState.isAnswersEdited ? commonStyle.editedItemColor : ""
                  }}
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Answers)}
               >
                  <DriveFileRenameOutlineIcon />
               </IconButton>
               <IconButton
                  sx={{
                     backgroundColor: props.editDialogueItemType == EditDialogueItemType.Translates ? commonStyle.editItemColor : "",
                     color: props.dialogueItemEditState.isAnswersTranslatesEdited ? commonStyle.editedItemColor : ""
                  }}
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Translates)}>
                  <TranslateIcon />
               </IconButton>
               <IconButton
                  sx={{
                     backgroundColor: props.editDialogueItemType == EditDialogueItemType.AnswersTenseses ? commonStyle.editItemColor : "",
                     color: props.dialogueItemEditState.isAnswersTensesListEdited ? commonStyle.editedItemColor : ""
                  }}
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                  <AvTimerIcon />
               </IconButton>
               <IconButton
                  sx={{
                     backgroundColor: props.editDialogueItemType == EditDialogueItemType.PossibleWords ? commonStyle.editItemColor : "",
                     color: props.dialogueItemEditState.isAnswersPossibleWordsEdited ? commonStyle.editedItemColor : ""
                  }}
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.PossibleWords)}>
                  <SpellcheckIcon />
               </IconButton>
               {props.editDialogueItemType == EditDialogueItemType.Answers ||
                  props.editDialogueItemType == EditDialogueItemType.AnswersTenseses ||
                  props.editDialogueItemType == EditDialogueItemType.Translates ||
                  props.editDialogueItemType == EditDialogueItemType.PossibleWords
                  ? <IconButton
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
                  : null
               }

            </Grid>
         }

         <Box>
            <Grid display='flex' direction='column' alignItems='end'>
               {props.currentDialogueLineData.map(answer => (
                  <Box>
                     <ChatElement
                        title={`student [possible answer]`}
                        position={"right"}
                        type={"text"}
                        text={answer}
                     />
                  </Box>
               ))}
            </Grid>

         </Box>
      </Box>
   )
}

const commonStyle = {
   editedItemColor: "#ff9800",
   editItemColor: "#fafafa"
}