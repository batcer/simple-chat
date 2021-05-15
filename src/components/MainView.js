import React from 'react';

import ContactList from './ContactList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

import styles from './MainView.module.css';

const MainView = () => {
    return (
        <div className={styles.mainView}>
            <div className={styles.contacts}>
                <ContactList/>
            </div>
            <div className={styles.channel}>
                <MessageList/>
                <MessageForm/>
            </div>
        </div>
    )
}

export default MainView;
