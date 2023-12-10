import { Box, Button, ButtonGroup, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/AddButton.tsx";
import { useAnswerCrud, usePhraseCrud, usePhrase, useDialogueItemConstructor } from "../../Data/useDialogues.ts";
import IPhraseModel from "../../../Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import IAnswerModel from "../../../Business/Models/IAnswerModel.ts";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import AnswerContructor from "../answerContructor/AnswerConstrutcor.tsx";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
}

export default function PhraseContructor(props: IPhraseConstructor) {

    const answerCrud = useAnswerCrud(props.dialogueId, props.id);
    const phraseCrud = usePhraseCrud(props.dialogueId, props.id);
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    
    const phrase = usePhrase(props.dialogueId, props.id);
    const [phraseForm, setPhraseForm] = useState<IPhraseModel>(phrase);
    
   

    function onAddButtonClick() {
        var phrase: IAnswerModel = {
            text: "New Answer",
            id: uuidv4(),
            tensesList: [],
            wordsToUse: [],
            explanations: [],
            phrases: [],
            parentId: props.id,
        }

        answerCrud.add(phrase);
    }

    const onAnswerButtonClick = (event) => {
        setSelection(event.target.id);
        setDialogueItemConstructor(() => <AnswerContructor dialogueId={props.dialogueId} id={event.target.id} />);
    }

    const onUpdate = (event) => {
        // var updatePhraze = JSON.parse(JSON.stringify(phrase))
        // updatePhraze.text = event.target.value;
        //     console.log(updatePhraze.text)
        // phraseCrud.update(phrase);
    }
    const onChangeText = (event) => {
        var updatePhraze = JSON.parse(JSON.stringify(phrase))
            updatePhraze.text = event.target.value;
        setPhraseForm(prev => ({
            ...prev, 
            text: event.target.value
        }));
        
        console.log(updatePhraze)

        phraseCrud.update(updatePhraze);
    }

    if(!phrase) {
        return;
    }
    console.log(phrase);
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>Phrase</div>
            <TensesList tensesList={phraseForm.tensesList} />

            <TextField
                defaultValue={phraseForm.text}
                id="outlined-basic"
                label="Text"
                variant="outlined"
                onChange={onChangeText}
                fullWidth
            />
            <TextField
                defaultValue={phraseForm.comments}
                id="outlined-basic"
                label="Comments"
                variant="outlined"
                fullWidth
            />

            <AddButton onCLick={onAddButtonClick} />

            {phraseForm.answers?.length != 0
                ?
                <Box>
                    <div>Next phrases</div>
                    <ButtonGroup
                    >
                        {phrase.answers?.map(answer => (
                            <Button id={answer.id} onClick={onAnswerButtonClick} sx={{ p: 1, }}>{answer.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }

           <SaveButton />
        </Box>
    )
}