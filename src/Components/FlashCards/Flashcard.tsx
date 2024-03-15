import React, { useState, useEffect, useRef } from 'react'
import ICard from './ICard'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import SignalCellularNodataRoundedIcon from '@mui/icons-material/SignalCellularNodataRounded';

export interface IFlashcardProps {
    flashcard: ICard;
    onEdit: (cardId: string) => void;
    onDelete: (cardId: string) => void;
}

export default function Flashcard(props: IFlashcardProps) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState<number>(0)

    const frontEl = useRef<HTMLInputElement>(null);
    const backEl = useRef<HTMLInputElement>(null);

    function setMaxHeight() {
        if (!frontEl || !frontEl?.current || !backEl || !backEl?.current) {
            return;
        }
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height

        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [props.flashcard.question, props.flashcard.answers, props.flashcard.options])

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])


    return (
        <Card sx={{maxWidth: "300px" }}>

            <Grid container justifyContent="flex-end" alignItems="flex-end">
                <IconButton sx={{ p: 0 }} onClick={() => props.onDelete(props.flashcard.id)}>
                    <SignalCellularNodataRoundedIcon sx={{ rotate: "270deg", color: "red", p: 0 }} />
                </IconButton>
            </Grid>
            <Box  sx={{ pl: 2, pr: 2, pb: 2, maxWidth: "300px" }}>

                <Box>
                    <IconButton onClick={() => props.onEdit(props.flashcard.id)}>
                        <CreateIcon />
                    </IconButton>
                </Box>

                <Box
                    className={`card ${flip ? 'flip' : ''}`}
                    style={{ height: height }}
                    onClick={() => setFlip(!flip)}
                >
                    <Box className="front" ref={frontEl}>
                        {props.flashcard.question}
                    </Box>
                    <Box className="back" ref={backEl} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        {props.flashcard.answers.map((answer, index) => (
                            <Typography align='center'>{`${index + 1}) ${answer}`}</Typography>
                        ))}
                    </Box>
                </Box>
            </Box>

        </Card>

    )
}
