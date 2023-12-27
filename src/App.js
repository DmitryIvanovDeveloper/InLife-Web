import React, { useEffect } from 'react';
import DialogueBuilder from './folderTree/DialogueBuilder';
import { Routes, Route } from 'react-router-dom';
import SignInTeacher from './components/Authentication/SignInTeacher';
import SignUp from './components/Authentication/SignUpTeacher';
import useUserQueriesApi from './ThereGame.Api/Queries/UserQueriesApi';
import './App.css';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';

export function App() {

    var userQuerisApi = useUserQueriesApi();

    useEffect(() => {
        userQuerisApi.getById();
    }, []);

    return (
        <React.StrictMode>
            <Routes>
                <Route path="/sign-in/teacher" element={<SignInTeacher />} />
                <Route path="/sign-up/teacher" element={<SignUpTeacher />} />
                <Route path="/sign-up/student" element={<SignUpStudent />} />
                <Route path="/builder" element={<DialogueBuilder />} />
            </Routes>
        </React.StrictMode>

    );
}

export default App;
