import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import './css/GameWebGL.css';
import { Avatar, Box, Button, Typography, } from "@mui/material";
import MainLogo from "../../Images/MainLogo.png"
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import PlayImage from '../../Images/MainLogo.png';

export default function GameWebGL() {
    const {
        unityProvider,
        isLoaded,
        loadingProgression,
        unload,
        
        requestFullscreen,
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
            <Box 
                sx={{
                    margin: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button 
                    variant='contained' 
                    onClick={() => setIsPlayHandler(!isPlay)}>
                        <Typography>{!isPlay ? "Play Game" : "Stop Game"}
                    </Typography></Button>
            </Box>

            {!isPlay
                ? null
                : <Box sx={{
                    margin: 2,
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 10px 15px",
                    height: window.screen.height / 2.5
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