import React, { useEffect } from 'react';
import DialogueBuilder from './folderTree/DialogueBuilder';
import { Routes, Route } from 'react-router-dom';
import SignInTeacher from './components/Authentication/SignInTeacher';
import SignUp from './components/Authentication/SignUpTeacher';
import useUserQueriesApi from './ThereGame.Api/Queries/UserQueriesApi';
import './App.css';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';
import Teacher from './components/Teacher/Teacher';

export function App() {

    var userQuerisApi = useUserQueriesApi();

    useEffect(() => {
        userQuerisApi.getById();
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
