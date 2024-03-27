import React, { useState, useEffect, useRef } from 'react'
import ICard from './ICard'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import SignalCellularNodataRoundedIcon from '@mui/icons-material/SignalCellularNodataRounded';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AbcIcon from '@mui/icons-material/Abc';

import QuizlGamesPanel from '../QuizlGame/QuizlGamesPanel';
import TranslateIcon from '@mui/icons-material/Translate';

export interface IFlashcardProps {
    flashcard: ICard;
    onEdit: (cardId: string) => void;
    onDelete: (cardId: string) => void;
    isCardSideFront: boolean;
}

export default function Flashcard(props: IFlashcardProps) {
    const [flip, setFlip] = useState(props.isCardSideFront)
    const [height, setHeight] = useState<number>(0)
    const [isShowQuizleGames, setIsShowQuizlGames] = useState<boolean>(false);


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
        setFlip(props.isCardSideFront)
    }, [props.isCardSideFront])

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <Card sx={{ maxWidth: "300px" }}>
            
            {isShowQuizleGames
                ? <QuizlGamesPanel
                    quizleGamesId={props.flashcard.quizleGamesId}
                    onClose={() => setIsShowQuizlGames(false)}
                />
                : null
            }
            <Grid container justifyContent="flex-end" alignItems="flex-end">
                <IconButton sx={{ p: 0 }} onClick={() => props.onDelete(props.flashcard.id)}>
                    <SignalCellularNodataRoundedIcon sx={{ rotate: "270deg", color: "red", p: 0 }} />
                </IconButton>


            </Grid>
            <Box sx={{ pl: 2, pr: 2, pb: 2, maxWidth: "300px"  }}>

                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <IconButton onClick={() => props.onEdit(props.flashcard.id)}>
                        <CreateIcon />
                    </IconButton>

                    <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                        <IconButton onClick={() => setIsShowQuizlGames(true)}>
                            <VideogameAssetIcon />
                        </IconButton>
                        <Typography color='green' variant='h6'>{props.flashcard.playedQuizlGame}</Typography>

                    </Box>

                    <Box marginLeft={1} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                        <TranslateIcon />
                        <Typography color='green' variant='h6'>{props.flashcard.playedWordTranslate}</Typography>
                    </Box>


                    <Box marginLeft={1} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                        <AbcIcon />
                        <Typography color='green' variant='h6'>{props.flashcard.playedBuildWord}</Typography>
                    </Box>
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
