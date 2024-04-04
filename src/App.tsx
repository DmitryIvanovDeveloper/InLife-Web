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
import { Box, CircularProgress } from '@mui/material';
import { RoleType } from './ThereGame.Business/Util/Role';

export function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>();

    //TODO: Refactor
    useEffect(() => {
        if (location.pathname == "/game") {
            navigate(LocalRoutes.studentProfile);
            return;
        }
        
        if (hasToken()) {
            var role = localStorage.getItem("Role");
            if (Number(role) == RoleType.Teacher)
            {
                navigate(LocalRoutes.main);

            }
            if (Number(role) == RoleType.Student)
            {
                navigate(LocalRoutes.studentProfile);
                return;
            }
        }
       
      
        if (location.pathname == "/" && !hasToken()) {
            navigate(LocalRoutes.signIn);
            return;
        }
    }, []);

    const hasToken = (): boolean => {
        return localStorage.getItem("Token") != null;
    } 

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