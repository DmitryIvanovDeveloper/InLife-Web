import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import { Alert, Box, Button, Typography, } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './css/GameWebGL.css';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";
import Draggable from 'react-draggable';
import AspectRatio from "@mui/joy/AspectRatio";
import { IGameWebGLSettings } from "./GameWebGLSettings";
import { useSelectedStudentVocabularyBlockCards } from "../../Data/useSelectedStudentVocabularyBlockCards";

export interface IGameWebJLEditor {
    settings: IGameWebGLSettings;
    setIsPlay: (isPlay: boolean) => void;
}

export default function GameBuildLetterseWebGLEditor(props: IGameWebJLEditor) {
    const [flex, setFlex] = React.useState(false);
    const [selectedStudentVocabularyBlockCards] = useSelectedStudentVocabularyBlockCards();
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const {
        unityProvider,
        isLoaded,
        requestFullscreen,
        unload,
        loadingProgression,
        UNSAFE__unityInstance

    } = useUnityContext({
        ...props.settings,
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
    });


    useEffect(() => {
        
    }, [selectedStudentVocabularyBlockCards]);

    const setIsPlayHandler = (isPlay: boolean): void => {
        setIsPlay(isPlay);
        props.setIsPlay(isPlay);

        if (isPlay) {
            return;
        }
        unload();
    }

    useEffect(() => {
        if (!isPlay) {
            return;
        }

        const wordData =  selectedStudentVocabularyBlockCards.map(card => {

            return {
                word: card.question,
                answer: card.answers[0],
                pictures: card.pictures
            }
        });

        UNSAFE__unityInstance?.SendMessage("WebGLManager", "SetWords", JSON.stringify(wordData));
    }, [selectedStudentVocabularyBlockCards]);

    return (
        <Draggable>
            <Box
                sx={{
                    position: 'absolute',
                    top: 50,
                    left: "40%",
                }}
            >
                {isLoaded || !isPlay
                    ? null
                    : <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' marginRight={4}>
                        <CircularProgressWithLabel value={loadingProgression} />
                    </Box>
                }

                <Box sx={{
                    margin: 2,

                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginRight: "4px",
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Button
                                variant='contained'
                                onClick={() => setIsPlayHandler(!isPlay)}
                                sx={{ alignItems: 'center' }}
                                color="success"
                            >
                                <Box
                                    display='flex'
                                    flexDirection="row"
                                    alignItems='center'
                                >
                                    {isPlay
                                        ? <Box
                                            display='flex'
                                            flexDirection="row"
                                            justifyContent='space-between'
                                            fontWeight='600'
                                        >
                                            Stop Game
                                            <StopCircleIcon sx={{ ml: 1 }} />
                                        </Box>
                                        : <Box
                                            display='flex'
                                            flexDirection="row"
                                            justifyContent='space-between'
                                            fontWeight='600'
                                        >
                                            Play Game
                                            <PlayCircleIcon sx={{ ml: 1 }} />
                                        </Box>

                                    }
                                </Box>
                            </Button>
                            <Button onClick={() => requestFullscreen(true)}>Full Screen</Button>
                        </Box>
                        {isPlay
                            ? <Typography sx={{ mr: 1 }}>Please sign in to use the scenario</Typography>
                            : null
                        }
                    </Box>
                    {!isPlay
                        ? null
                        : <Box
                            sx={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 10px 15px",
                            }}
                        >
                            <AspectRatio ratio="21/9" flex={flex} sx={{ flexBasis: 200 }}>
                                <Unity
                                    unityProvider={unityProvider}
                                    tabIndex={1}
                                    style={{
                                        display: isLoaded ? "block" : "none",
                                        height: "348px",
                                        width: "790px"
                                    }}
                                />
                            </AspectRatio>

                        </Box>
                    }

                </Box>
            </Box>
        </Draggable>
    );
}