import React, { useState, useEffect, useRef } from 'react'
import ICard from './Card'
import { Box, Typography } from '@mui/material'

export interface IFlashcardProps {
    flashcard: ICard
}

export default function Flashcard({ flashcard }) {
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

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <Box
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height: height }}
            onClick={() => setFlip(!flip)}
        >
            <Box className="front" ref={frontEl}>
                {flashcard.question}
            </Box>
            <Box className="back" ref={backEl}>
                <Typography align='center'>{flashcard.answer}</Typography>
                
                </Box>
        </Box>
    )
}
