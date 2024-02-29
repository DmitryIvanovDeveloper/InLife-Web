import React, { useEffect, useState } from "react";
import { Unity, useUnityContext, } from "react-unity-webgl";
import { Box, Button, CircularProgress, CircularProgressProps, Typography, } from "@mui/material";
import './css/GameWebGL.css';
import CircularProgressWithLabel from "../CircularProgress/CircularProgressWithLabel";
export interface IGameWebJL {
}
export default function GameWebGL(props: IGameWebJL) {
    const {
        unityProvider,
        isLoaded,
        requestFullscreen,
        loadingProgression,
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

    return (
        <Box
            sx={{
                margin: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center',
                width: '100%',
                height: '1000px'
            }}
        >
            {!isLoaded
                ? <CircularProgressWithLabel value={loadingProgression} />
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