import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import { Box, Button, Typography, } from "@mui/material";
import useConstructorActions from "../../Data/ConstructorActions";
import { useConstructorActionsState } from "../../Data/useConstructorActionsState";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './css/GameWebGL.css';
import AspectRatio from "@mui/joy/AspectRatio";

export interface IGameWebJL {
}
export default function GameWebGL(props: IGameWebJL) {
    const {
        unityProvider,
        isLoaded,
        requestFullscreen,
        unload,
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

    const setIsPlayHandler = (isPlay: boolean): void => {
        setIsPlay(isPlay);
        if (isPlay) {
            return;
        }
        unload();
    }

    return (
        <Box
            sx={{
                margin: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '1000px'
            }}
        >
            {!isLoaded
                ? null
                : <Box display='flex' justifyContent='flex-end' marginRight={4}>
                    <Button onClick={() => requestFullscreen(true)}>Full Screen</Button>
                </Box>
            }
            <Unity
                unityProvider={unityProvider}
                tabIndex={1}
                style={{
                    display: isLoaded ? "block" : "none",
                    width: "960px",
                    height: "600px"
                }}
            />
        </Box>
    );
}