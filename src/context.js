import React from 'react';

import storage from './storage';
import {ChatStore} from './store/ChatStore';

export const StoreContext = React.createContext(null);

export const ChatStoreProvider = ({ children }) => {
    const store = new ChatStore(storage);
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
};
