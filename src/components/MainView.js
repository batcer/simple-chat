import React from 'react';

import ContactList from './ContactList';
import MessageList from './MessageList';

import styles from './MainView.module.css';

const MainView = () => {
    return (
        <div className={styles.mainView}>
            <div className={styles.contacts}>
                <ContactList/>
            </div>
            <div className={styles.messages}>
                <MessageList/>
            </div>
        </div>
    )
}

export default MainView;
