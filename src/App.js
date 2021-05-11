import React from 'react';

import MainView from './components/MainView';
import {ChatStoreProvider} from './context';

import commonStyles from './App.module.css';

function App() {
    return (
        <ChatStoreProvider>
            <div className={commonStyles.App}>
                <MainView/>
            </div>
        </ChatStoreProvider>
    )
}

export default App;
