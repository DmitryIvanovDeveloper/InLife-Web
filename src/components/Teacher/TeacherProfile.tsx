// IMPORTS
import Card from "@mui/material/Card";
import { Box, CircularProgress, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuAppBar from "../AppBars/MenuAppBar";
import useTeacherQueriesApi from "../../ThereGame.Api/Queries/TeacherQueriesApi";
import BasicTabs from "../Tabs/Tab";

// STYLES
const styles = {
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1"
    },
    value: {
        padding: "1rem 2rem",
        borderTop: "1px solid #e1e1e1",
        color: "#899499"
    }
};

export default function TeacherProfile(props: any) {
    const teacherQueriesApi = useTeacherQueriesApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        teacherQueriesApi.getById()
            .then(() => {
                setIsLoading(false);
            });
    }, []);
    
    if (isLoading) {
        <Box display='flex' justifyContent='center' height='1000vh'>
            <CircularProgress />
        </Box>
    }
    
    return (
        <Card variant="outlined">
            <MenuAppBar teacherId="teacher?.id"/>
            <BasicTabs />
        </Card>
    );
}
