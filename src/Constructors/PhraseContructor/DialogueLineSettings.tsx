import { Box, Button, CircularProgress, Grid, IconButton } from "@mui/material";
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
import { useState } from "react";

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
               <Button onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Answers)}>
                  Answers
                  <DriveFileRenameOutlineIcon
                     sx={{
                        backgroundColor: props.editDialogueItemType == EditDialogueItemType.Answers ? commonStyle.editItemColor : "",
                        color: props.dialogueItemEditState.isAnswersEdited ? commonStyle.editedItemColor : ""
                     }}
                  />
               </Button>
               <Button
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.Translates)}>
                  Translates
                  <TranslateIcon
                     sx={{
                        backgroundColor: props.editDialogueItemType == EditDialogueItemType.Translates ? commonStyle.editItemColor : "",
                        color: props.dialogueItemEditState.isAnswersTranslatesEdited ? commonStyle.editedItemColor : ""
                     }}
                  />
               </Button>
               <Button
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.AnswersTenseses)}>
                  Tenseses
                  <AvTimerIcon
                     sx={{
                        backgroundColor: props.editDialogueItemType == EditDialogueItemType.AnswersTenseses ? commonStyle.editItemColor : "",
                        color: props.dialogueItemEditState.isAnswersTensesListEdited ? commonStyle.editedItemColor : ""
                     }}
                  />
               </Button>
               <Button
                  onClick={() => props.onEditDialogueItemType(EditDialogueItemType.PossibleWords)}>
                     Words
                  <SpellcheckIcon
                     sx={{
                        backgroundColor: props.editDialogueItemType == EditDialogueItemType.PossibleWords ? commonStyle.editItemColor : "",
                        color: props.dialogueItemEditState.isAnswersPossibleWordsEdited ? commonStyle.editedItemColor : ""
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

         <Box>
            <Grid display='flex' direction='column' alignItems='end'>
               {props.currentDialogueLineData.map(answer => (
                  <Box>
                     <Message
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