import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import React, {useState } from "react";
import TensesList from "../TensesList.tsx";
import AddButton from "../../components/AddButton.tsx";
import IPhraseModel from "../../../Business/Models/IPhraseModel.ts";
import { v4 as uuidv4 } from 'uuid';
import { useAnswer, useAnswerCrud, useDialogueItemConstructor, usePhraseCrud } from "../../Data/useDialogues.ts";
import SaveButton from "../../components/buttons/SaveButton.tsx";
import { useSelection } from "../../Data/useSelection.ts";
import PhraseContructor from "../phrazeContructor.tsx/PhrazeContructor.tsx";
import IAnswerModel from "../../../Business/Models/IAnswerModel.ts";

export interface IAnswerContructor {
    dialogueId: string,
    id: string,
}

export default function AnswerContructor(props: IAnswerContructor) {
    const phraseCrud = usePhraseCrud(props.dialogueId, props.id);
    const answerCrud = useAnswerCrud(props.dialogueId, props.id);

    const answer = useAnswer(props.dialogueId, props.id);
    
    const [selection, setSelection] = useSelection();
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();

    function onAddButtonClick() {
        var phrase: IPhraseModel = {
            text: "New Phrase",
            answers: [],
            tensesList: [],
            comments: "",
            id: uuidv4(),
            parentId: props.id
        }

        phraseCrud.add(phrase);
    }

    function setAnswer(event){

    }
    const onPhraseButtonClick = (event) => {
        setSelection(event.target.id);
        setDialogueItemConstructor(() => <PhraseContructor dialogueId={props.dialogueId} id={event.target.id}/>);
    }
    const onUpdate = (event) => {
        var updatePhraze = JSON.parse(JSON.stringify(answer));
        updatePhraze.text = event.target.value;

        // answerCrud.update(updatePhraze);
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"

        >
            <div>Answer</div>

            <TensesList tensesList={answer.tensesList} />

            <TextField
                defaultValue={answer.text}
                id="outlined-basic"
                label="Answer"
                variant="outlined"
                onChange={(event) => onUpdate(event)}
                fullWidth
            />
            <TextField
                defaultValue={answer.wordsToUse}
                id="outlined-basic"
                label="Words To Use"
                variant="outlined"
                fullWidth
            />
            {answer.explanations.map(explanation => (
                <Box>
                    <TextField
                        defaultValue={explanation.word}
                        id="outlined-basic"
                        label="Word"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ pl: 0.5 }}
                        defaultValue={explanation.text}
                        id="outlined-basic"
                        label="Mistake Explanation"
                        variant="outlined"
                    />
                </Box>
            ))}

            <AddButton onCLick={onAddButtonClick} />
           
            {answer.phrases?.length != 0
                ?
                <Box>
                    <div>Next phrases</div>
                    <ButtonGroup
                    >
                        {answer.phrases?.map(answer => (
                            <Button id={answer.id} onClick={onPhraseButtonClick} sx={{ p: 1, }}>{answer.text}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                : null
            }

            <SaveButton />
        </Box>
    )
}

