import React, { useEffect, useState } from 'react';
import DialogueBuilder from './DialogueTree/DialogueBuilder';
import SignInTeacher from './components/Authentication/SignInTeacher';
import useTeacherQueriesApi from './ThereGame.Api/Queries/TeacherQueriesApi';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';
import TeacherProfile from './components/Teacher/TeacherProfile';
import { useNavigate, Routes, Route } from "react-router-dom";
import { Status } from './ThereGame.Infrastructure/Statuses/Status';
import { Routes as LocalRoutes } from './Routes';
import './App.css';
import ProfileEditor from './components/Profile/ProfileEditor';
import StudentProfile from './components/Student/StudentProfile';
import { Box, CircularProgress } from '@mui/material';

export function App() {

    var teacherQuerisApi = useTeacherQueriesApi();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        teacherQuerisApi.getById()
            .then(status => {
                if (status == Status.Unauthorized) {
                    navigate(LocalRoutes.signInTeacher)
                    return;
                }

                if (status == Status.OK) {
                    navigate(LocalRoutes.teacherProfile)
                    return;
                }

                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        <Box display='flex' justifyContent='center' height='1000vh'>
            <CircularProgress />
        </Box>
    }
    return (
        <React.StrictMode>
            <Routes>
                <Route path={LocalRoutes.signInTeacher} element={<SignInTeacher />} />
                <Route path={LocalRoutes.signUpTeacher} element={<SignUpTeacher />} />
                <Route path={LocalRoutes.signUpStudent} element={<SignUpStudent />} />
                <Route path={LocalRoutes.teacherProfile} element={<TeacherProfile />} />
                <Route path={LocalRoutes.studentProfile} element={<StudentProfile />} />
                <Route path={LocalRoutes.teacherProfileEditor} element={<ProfileEditor />} />
                <Route path={LocalRoutes.dialoguesBuilder} element={<DialogueBuilder />} />
            </Routes>
        </React.StrictMode>

    );
}

export default App;
