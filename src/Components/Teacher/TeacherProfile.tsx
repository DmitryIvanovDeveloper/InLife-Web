// IMPORTS
import { Box, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import useTeacherQueriesApi from "../../ThereGame.Api/Queries/TeacherQueriesApi";
import MenuAppBar from "../AppBars/MenuAppBar";
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
        setIsLoading(true);
        teacherQueriesApi.getById()
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Card variant="outlined">
            <MenuAppBar teacherId="teacher?.id" />
            <BasicTabs />
        </Card>
    );
}