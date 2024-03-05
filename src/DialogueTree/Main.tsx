import SplitPane from "react-split-pane";
import { useDialogueItemConstructor } from "../Data/useDialogues";
import Dialogues from "./Dialogues";
import { AppBar, Box, Button, CircularProgress, Grid } from "@mui/material";
import GameWebGLEditor from "../Components/GameWebGL/GameWebGLEditor";
import useTeacherQueriesApi from "../ThereGame.Api/Queries/TeacherQueriesApi";
import { ReactElement, useEffect, useState } from "react";
import { RoleType } from "../ThereGame.Business/Util/Role";
import { useNavigate } from "react-router-dom";
import { Routes as LocalRoutes } from '../Routes';
import DialogueGraph from "../Components/GraphTree/DialogueGraph";
import MiniDrawer from "../Components/Sidebar/SIdebar";
import Constructor from "../Constructors/Constructor";
import { useGameWebGL } from "../Data/useGameWebGL";

export default function Main() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSelectedStudents, setIsSelectedStudents] = useState<boolean>(false);
    const teacherQueriesApi = useTeacherQueriesApi();
    const [itemConstructor] = useDialogueItemConstructor();
    const navigate = useNavigate();

    const [_, setGameWwebGL] = useGameWebGL();
    
    useEffect(() => {
        setGameWwebGL(<GameWebGLEditor /> );

        var role = localStorage.getItem("Role");
        if (Number(role) == RoleType.Teacher) {
            teacherQueriesApi.getById().then(result => {
                navigate(LocalRoutes.main);
                setIsLoading(false);
            });
            return;
        }
    }, []);

    function Canvas(): ReactElement {
        return (
            <Grid sx={{
                mt: 10,
                width: "100%",
                flexDirection: 'column',
                alignItems: "flex-end",
            }}>
                <Grid width='100%' display='flex' flexDirection='row' justifyContent='space-between' height='100vh' >
                    <DialogueGraph />
                    <Constructor />
                </Grid>
            </Grid>
        )
    }

    if (isLoading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height="100dvh"
            >
                <CircularProgress />
            </Box>
        )
    }
    return (
        <MiniDrawer barElements={<Dialogues setIsSelectedStudents={setIsSelectedStudents} />} elements={!isSelectedStudents ? <Canvas /> : itemConstructor} />
    )
}
