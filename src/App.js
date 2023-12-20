import React from 'react';
import './App.css';
import DialogueBuilder from './folderTree/DialogueBuilder';
import { RecoilRoot } from 'recoil';

export function App() {

    return (
        <RecoilRoot>
            <div className="App">
                <header className="App-header">
                    <div style={{ padding: "10px" }}>
                        <DialogueBuilder />
                    </div>
                </header>
            </div>
        </RecoilRoot>

    );
}

export default App;
