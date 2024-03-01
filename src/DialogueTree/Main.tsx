import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import Dialogues from "./Dialogues";
import { Box, CircularProgress } from "@mui/material";
import GameWebGLEditor from "../Components/GameWebGL/GameWebGLEditor";
import useTeacherQueriesApi from "../ThereGame.Api/Queries/TeacherQueriesApi";
import { useEffect, useState } from "react";
import { RoleType } from "../ThereGame.Business/Util/Role";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes as LocalRoutes } from '../Routes';

export default function Main() {

    const [dialogueItemConstructor] = useDialogueItemConstructor();
    const teacherQueriesApi = useTeacherQueriesApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        var role = localStorage.getItem("Role");
        if (Number(role) == RoleType.Teacher) {
            teacherQueriesApi.getById().then(result => {
                navigate(LocalRoutes.main);
                setIsLoading(false);
            });
            return;
        }
    }, []);

    return (
        //@ts-ignore
        <SplitPane split="vertical" minSize={250} defaultSize={window.innerWidth / 2} maxSize={window.innerWidth / 2}>
            {isLoading
                ? <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height="100dvh"
                >
                    <CircularProgress />
                </Box>
                : <Dialogues />
            }

            <Box sx={{ overflow: 'scroll', height: window.screen.height }}>
                <GameWebGLEditor />
                {dialogueItemConstructor}
            </Box>
        </SplitPane>
    )
}

