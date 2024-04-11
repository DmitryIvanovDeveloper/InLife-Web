import React, { useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModalConstructor from "../../ModalContructor";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatGptService from "../../../ThereGame.Infrastructure/Services/ChatGpt/ChatGptService";

export interface IPhraseInfoProps {
    phrase: string;
    onChangeText: (phrase: string) => void;
    setIsClickedOnDelete: () => void;
    setVocabularyWordsId: (vocabularyWords: string[]) => void;
    vocabularyWordsId: string[];
    hasDeleteButton: boolean;
}



export default function PhraseInfo(props: IPhraseInfoProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const generatePhrase = async () => {
        const chatGpt = await new ChatGptService().generatePhrase("", []);
        console.log(chatGpt);
    }


    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            width="100%"
        >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                <TextField
                    sx={{ m: 3, position: "relative", border: "none !important",  }}
                    InputLabelProps={{ shrink: true }}
                    value={props.phrase}
                    id="outlined-basic"
                    variant='standard'
                    onChange={(event) => props.onChangeText(event.target.value)}
                    required={true}
                    placeholder="Hey! Hello! Today is a great day for fitness!"
                    fullWidth
                />
                <IconButton onClick={generatePhrase}>
                    <SmartToyIcon />
                </IconButton>
            </Box>


            {!props.hasDeleteButton
                ? null
                : <IconButton onClick={() => setIsOpen(true)} sx={{ color: '#c62828' }}>
                    <DeleteOutlinedIcon />
                </IconButton>
            }

            <ModalConstructor element={
                <Button
                    onClick={() => props.setIsClickedOnDelete()}
                    fullWidth>Forget
                </Button>
            }
                isOpen={isOpen}
                editDialogueItemType={undefined}
                onClose={() => setIsOpen(false)}
                description="It looks like the phrase with 'storylines' you don't need any more! Need i to forget it?"
                specificButtonName="Close"
            />
        </Box>

    )
}