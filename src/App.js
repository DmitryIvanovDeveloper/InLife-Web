import React, { useEffect } from 'react';
import DialogueBuilder from './folderTree/DialogueBuilder';
import { Routes, Route } from 'react-router-dom';
import SignInTeacher from './components/Authentication/SignInTeacher';
import useUserQueriesApi from './ThereGame.Api/Queries/UserQueriesApi';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';
import Teacher from './components/Teacher/Teacher';
import { useNavigate } from "react-router-dom";
import './App.css';
import { AppBar } from '@mui/material';

export function App() {

    var userQuerisApi = useUserQueriesApi();
    const navigate = useNavigate();

    useEffect(() => {
        userQuerisApi.getById()
        .then(result => {
            if (!result)
            {
                navigate('/auth/sign-in/teacher')
                return;
            }
            navigate('/teacher')
        });
    }, []);

    return (
        <React.StrictMode>
            <Routes>
                <Route path="/auth/sign-in/teacher" element={<SignInTeacher />} />
                <Route path="/auth/sign-up/teacher" element={<SignUpTeacher />} />
                <Route path="/auth/sign-up/student" element={<SignUpStudent />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/builder" element={<DialogueBuilder />} />
            </Routes>
        </React.StrictMode>

    );
}

export default App;
