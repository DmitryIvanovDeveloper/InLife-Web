import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import { Alert, Box, Button, Typography, } from "@mui/material";
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './css/GameWebGL.css';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";
import Draggable from 'react-draggable';
import AspectRatio from "@mui/joy/AspectRatio";

export interface IGameWebJLEditor {
}
export default function GameWebGLEditor(props: IGameWebJLEditor) {
    const [flex, setFlex] = React.useState(false);
    const {
        unityProvider,
        isLoaded,
        requestFullscreen,
        unload,
        loadingProgression,
        UNSAFE__unityInstance

    } = useUnityContext({
        loaderUrl: "/unity/InLifeWebGl.loader.js",
        dataUrl: "/unity/InLifeWebGl.data",
        frameworkUrl: "/unity/InLifeWebGl.framework.js",
        codeUrl: "/unity/InLifeWebGl.wasm",
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
    });

    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [constructorActionsState] = useConstructorActionsState();
    const actions = useConstructorActions();

    const setIsPlayHandler = (isPlay: boolean): void => {
        setIsPlay(isPlay);
        if (isPlay) {
            return;
        }
        unload();
    }

    useEffect(() => {
        UNSAFE__unityInstance?.SendMessage("WebGLController", "SelectNpc", constructorActionsState.selectedNpc.id);
    }, [constructorActionsState.selectedNpc.id]);

    useEffect(() => {

        UNSAFE__unityInstance?.SendMessage("WebGLController", "SetSpecificScenario", constructorActionsState.selectedNpc.scenarioId);
    }, [constructorActionsState.selectedNpc.scenarioId]);

    useEffect(() => {
        UNSAFE__unityInstance?.SendMessage("WebGLController", "SetSpecificPhrase", constructorActionsState.selectedNpc.specificPhraseId);
    }, [constructorActionsState.selectedNpc.specificPhraseId]);

    useEffect(() => {
        if (!constructorActionsState.isScenarioUpdated) {
            return;
        }

        UNSAFE__unityInstance?.SendMessage("WebGLController", "OnUpdate");
        actions.setIsScenarioUpdated(false);

    }, [constructorActionsState.isScenarioUpdated]);

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                ml: 9,
            }}
        >
            {/* {isPlay
                ? <Alert severity="info">Sign in the game to use editor</Alert>
                : null
            } */}


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
                        justifyContent: 'flex-start',
                        marginRight: "4px"
                    }}
                >
                    <Button onClick={() => requestFullscreen(true)}>Full Screen</Button>
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

    );
}