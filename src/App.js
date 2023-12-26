import React, { useEffect } from 'react';
import DialogueBuilder from './folderTree/DialogueBuilder';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import useUserQueriesApi from './ThereGame.Api/Queries/UserQueriesApi';
import './App.css';

export function App() {

    var userQuerisApi = useUserQueriesApi();

    useEffect(() => {
        userQuerisApi.getById();
    }, []);

    return (
        <React.StrictMode>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/builder" element={<DialogueBuilder />} />
            </Routes>
        </React.StrictMode>

    );
}

export default App;
