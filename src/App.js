import React, { useEffect } from 'react';
import DialogueBuilder from './folderTree/DialogueBuilder';
import SignInTeacher from './components/Authentication/SignInTeacher';
import useTeacherQueriesApi from './ThereGame.Api/Queries/TeacherQueriesApi';
import SignUpStudent from './components/Authentication/SignUpStudent';
import SignUpTeacher from './components/Authentication/SignUpTeacher';
import TeacherProfile from './components/Teacher/TeacherProfile';
import { useNavigate, Routes, Route } from "react-router-dom";
import { Status } from './ThereGame.Infrastructure/Statuses/Status';
import { Routes as LocalRoutes} from './Routes';
import './App.css';
import ProfileEditor from './components/Profile/ProfileEditor';

export function App() {

    var teacherQuerisApi = useTeacherQueriesApi();
    const navigate = useNavigate();

    useEffect(() => {
        teacherQuerisApi.getById()
        .then(status => {
            if (status == Status.Unauthorized)
            {
                navigate(LocalRoutes.SignInTeacher)
                return;
            }

            if (status == Status.OK)
            {
                navigate(LocalRoutes.teacherProfile)
                return;
            }
        });
    }, []);

    return (
        <React.StrictMode>
            <Routes>
                <Route path={LocalRoutes.signInTeacher} element={<SignInTeacher />} />
                <Route path={LocalRoutes.signUpTeacher} element={<SignUpTeacher />} />
                <Route path={LocalRoutes.signUpStudent} element={<SignUpStudent />} />
                <Route path={LocalRoutes.teacherProfile} element={<TeacherProfile />} />
                <Route path={LocalRoutes.teacherProfileEditor} element={<ProfileEditor />} />
                <Route path={LocalRoutes.dialoguesBuilder} element={<DialogueBuilder />} />
            </Routes>
        </React.StrictMode>

    );
}

export default App;
