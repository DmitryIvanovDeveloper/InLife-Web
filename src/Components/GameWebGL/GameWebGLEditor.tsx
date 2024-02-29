import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import { Alert, Box, Button, getBottomNavigationActionUtilityClass, } from "@mui/material";
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './css/GameWebGL.css';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";

export interface IGameWebJLEditor {
}
export default function GameWebGLEditor(props: IGameWebJLEditor) {
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
        if (!isPlay) {
            return;
        }
        sendMessagesToUnity();
    }, [constructorActionsState.selectedNpc]);

    useEffect(() => {
        if (!constructorActionsState.isScenarioUpdated) {
            return;
        }

        UNSAFE__unityInstance?.SendMessage("WebGLController", "OnUpdate");
        actions.setIsScenarioUpdated(false);

    }, [constructorActionsState.isScenarioUpdated]);

    const sendMessagesToUnity = () => {
        UNSAFE__unityInstance?.SendMessage("WebGLController", "SelectNpc", constructorActionsState.selectedNpc.id);
        UNSAFE__unityInstance?.SendMessage("WebGLController", "SetSpecificScenario", constructorActionsState.selectedNpc.scenarioId);
        UNSAFE__unityInstance?.SendMessage("WebGLController", "SetSpecificPhrase", constructorActionsState.selectedNpc.specificPhraseId);
    }

    return (
        <Box>
            {isPlay
                ? <Alert severity="info">Sign in the game to use editor</Alert>
                : null
            }

            <Box
                sx={{
                    margin: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
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
            {!isLoaded
                ? <CircularProgressWithLabel value={loadingProgression} />
                : <Box display='flex' justifyContent='flex-end' marginRight={4}>
                    <Button onClick={() => requestFullscreen(true)}>Full Screen</Button>
                </Box>
            }

            {!isPlay
                ? null
                : <Box sx={{
                    margin: 2,
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 10px 15px",

                }}>
                    <Unity
                        unityProvider={unityProvider}
                        tabIndex={1}
                        style={{
                            display: isLoaded ? "block" : "none",
                            height: window.screen.height / 2.5,
                            width: "100%"
                        }}
                    />
                </Box>
            }
        </Box>

    );
}