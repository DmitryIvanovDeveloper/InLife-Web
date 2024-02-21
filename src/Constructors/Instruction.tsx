import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Button } from "@mui/material"
import React, { useState } from "react"
import DialogueLineAnswersInstructions from "./DialogueLine/Constructor/DialogueLineAnswersInstructions"
import PossibleWordsToUseInstruction from "./DialogueLine/PossibleWordsToUse/PossibleWordsToUseInstruction"
import DialogueLineTensesListInstruction from "./DialogueLine/TensesList/DialogueLineTensesListInstruction"
import TranslatesInstructions from "./DialogueLine/Translates/TranslatesInstructions"
import CommentsInstruction from "./PhraseContructor/Comments/CommentsInstruction"
import PhraseInstruction from "./PhraseContructor/Phrase/PhraseInstruction"
import TensesListInstruction from "./PhraseContructor/TensesList/TensesListInstruction"
import { EditDialogueItemType } from "./models/EditType"
import VoiceSettingsInstruction from "./DialogueConstructor/VoiceSettings/VoiceSettingsInstruction"
import AccessSettingsInsrtuction from "./DialogueConstructor/AccessSettings/AccessSettingsInstruction"
import ScenarioInstructions from "./Scenario/ScenarioInstructions"

export interface IInstructionProps {
    editDialogueItemType: EditDialogueItemType | undefined;
    isOpen: boolean;
    onClose: () => void
}
export default function Instruction(props: IInstructionProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const getInstruction = () => {
        if (props.editDialogueItemType == EditDialogueItemType.Phrase) {
            return <PhraseInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.Comments) {
            return <CommentsInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.PhraseTenseses) {
            return <TensesListInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.Answers) {
            return <DialogueLineAnswersInstructions />
        }
        if (props.editDialogueItemType == EditDialogueItemType.AnswersTenseses) {
            return <DialogueLineTensesListInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.PossibleWords) {
            return <PossibleWordsToUseInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.Translates) {
            return <TranslatesInstructions />
        }
        if (props.editDialogueItemType == EditDialogueItemType.VoiceSettings) {
            return <VoiceSettingsInstruction />
        }
        if (props.editDialogueItemType == EditDialogueItemType.Scenario) {
            return <ScenarioInstructions />
        }
        if (props.editDialogueItemType == EditDialogueItemType.StudentsAccess) {
            return <AccessSettingsInsrtuction />
        }
        

        return null;
    }

    const getInstructionName = () => {
        if (props.editDialogueItemType == EditDialogueItemType.Phrase) {
            return "Actor phrase"
        }
        if (props.editDialogueItemType == EditDialogueItemType.Comments) {
            return "Comments"
        }
        if (props.editDialogueItemType == EditDialogueItemType.PhraseTenseses) {
            return "Phrase tenseses"
        }
        if (props.editDialogueItemType == EditDialogueItemType.Answers) {
            return "Possible answers"
        }
        if (props.editDialogueItemType == EditDialogueItemType.AnswersTenseses) {
            return 'Answers tnseses'
        }
        if (props.editDialogueItemType == EditDialogueItemType.PossibleWords) {
            return "Possible words"
        }
        if (props.editDialogueItemType == EditDialogueItemType.Translates) {
            return "Answers translates"
        }
        if (props.editDialogueItemType == EditDialogueItemType.VoiceSettings) {
            return "Actor voice"
        }
        if (props.editDialogueItemType == EditDialogueItemType.Scenario) {
            return "Scenario"
        }
        if (props.editDialogueItemType == EditDialogueItemType.StudentsAccess) {
            return "Student Access"
        }

        return null;
    }
    return (
            <Dialog
                fullScreen={fullScreen}
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {getInstructionName()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                     {getInstruction()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={props.onClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
    )
}