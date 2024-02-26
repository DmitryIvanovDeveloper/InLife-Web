import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import Main from './DialogueTree/Main';
import { Routes as LocalRoutes } from './Routes';
import SignIn from './Components/Authentication/SignIn';
import SignUpStudent from './Components/Authentication/SignUpStudent';
import SignUpTeacher from './Components/Authentication/SignUpTeacher';
import ProfileEditor from './Components/Profile/ProfileEditor';
import StudentProfile from './Components/Student/Profile/StudentProfile';
import useTeacherQueriesApi from './ThereGame.Api/Queries/TeacherQueriesApi';
import { Box, CircularProgress } from '@mui/material';

export function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const teacherQueriesApi = useTeacherQueriesApi();
    const [isLoading, setIsLoading] = useState<boolean>();

    useEffect(() => {
        if (!!localStorage.getItem("[Teacher] - Token")) {
            setIsLoading(true);
            teacherQueriesApi.getById().then(result => {
                setIsLoading(false);
                navigate(LocalRoutes.main);
            });
        }
        if (location.pathname == "/") {
            navigate(LocalRoutes.signIn);
            return;
        }
    }, []);

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' height='100vh' alignItems='center'>
                <CircularProgress />
            </Box>
        )
    }
    return (
            <React.StrictMode>
                <Routes>
                    <Route path={LocalRoutes.signIn} element={<SignIn />} />
                    <Route path={LocalRoutes.signUpTeacher} element={<SignUpTeacher />} />
                    <Route path={LocalRoutes.signUpStudent} element={<SignUpStudent />} />
                    <Route path={LocalRoutes.studentProfile} element={<StudentProfile />} />
                    <Route path={LocalRoutes.teacherProfileEditor} element={<ProfileEditor />} />
                    <Route path={LocalRoutes.main} element={<Main />} />
                </Routes>
            </React.StrictMode>
    );
}

export default App;