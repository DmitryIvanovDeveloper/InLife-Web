import React, { useEffect } from 'react';
import DialogueBuilder from './DialogueTree/DialogueBuilder';
import SignIn from './components/Authentication/SignIn';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';
import TeacherProfile from './components/Teacher/TeacherProfile';
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { Routes as LocalRoutes } from './Routes';
import ProfileEditor from './components/Profile/ProfileEditor';
import StudentProfile from './components/Student/StudentProfile';
import './App.css';

export function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!!localStorage.getItem("[Teacher] - Token")){
            navigate(LocalRoutes.teacherProfile);
            return;
        }
        if (location.pathname == "/"){
            navigate(LocalRoutes.signIn);
            return;
        }
    }, []);

    return (
        <React.StrictMode>
            <Routes>
                <Route path={LocalRoutes.signIn} element={<SignIn />} />
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
