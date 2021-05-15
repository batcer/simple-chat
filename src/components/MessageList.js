import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

import {StoreContext} from '../context';

import styles from './MessageList.module.css';

const MessageItem = ({message, name}) => {
    const classNames = classnames(styles.messageWrapper, {[styles.myMessage]: message.isMine()})
    return (
        <div className={classNames}>
            <div className={styles.message}>
                <div className={styles.messageMeta}>
                    <div className={styles.messageContactName}>
                        {name ?? 'Sender not in contact list'}
                    </div>
                    <div className={styles.messageDate}>
                        {new Intl.DateTimeFormat(window.navigator.language, {
                            weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
                            hour: 'numeric', minute: 'numeric', second: 'numeric'
                        }).format(new Date(message.date))}
                    </div>
                </div>
                <div className={styles.messageContent}>
                    {message.text}
                </div>
            </div>
        </div>
    )
}

const MessageList = () => {
    const {currentChannel, getContactById} = useContext(StoreContext);
    return (
        <div className={styles.messageList}>
            {currentChannel && currentChannel.messages.map(message =>
                <MessageItem
                    message={message}
                    name={getContactById(message.contactId)?.name}
                    key={message.id}
                />
            )}
            {!currentChannel && <div>Select a user</div>}
        </div>
    )
}

export default observer(MessageList);
