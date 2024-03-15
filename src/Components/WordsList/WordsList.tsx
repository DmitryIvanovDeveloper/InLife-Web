import { Box, List, CardActionArea, Card, useThemeProps, Button, Grid, Typography, IconButton } from "@mui/material";
import { useWordsState } from "../../Data/useWords";
import { useState } from "react";
import Draggable from "react-draggable";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ActionButton from "../Button/ActionButton";
export interface IWordsList {
    onSelectWord: (id: string) => void;
    onAddWord: (id: string) => void;
}
export default function WordsList(props: IWordsList) {
    const [wordsState] = useWordsState();
    const [isMouseOverButton, setIsMouseOverButton] = useState<boolean>(false);

    return (
       
            <List
                sx={{ mt: "50px", overflow: 'auto', width: '200px', p: 1 }}
            >
                {wordsState.map(card => (
                    <CardActionArea onClick={() => props.onAddWord(card.id)} sx={{ width: '100px', }}>
                        <Card sx={{ p: 1, height: "50px", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <Typography alignItems='center' align="center" variant="h6">{card.word}</Typography>
                        </Card>
                    </CardActionArea>
                ))}
            </List>
    )
}