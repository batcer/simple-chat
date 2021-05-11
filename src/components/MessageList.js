import React, {useContext} from 'react';

import {StoreContext} from '../context';
import {observer} from 'mobx-react';

const MessageItem = ({message, name}) => {
    return (
        <div>
            <div>{name ?? 'Sender not in contact list'}</div>
            <div>{message.date}</div>
            <div>{message.text}</div>
        </div>
    )
}

const MessageList = () => {
    const {currentChannel, getContactById} = useContext(StoreContext);
    if (!currentChannel) {
        return <div>Select a user</div>
    }
    return (
        currentChannel.messages.map(message =>
            <MessageItem
                message={message}
                name={getContactById(message.contactId)?.name}
                key={message.id}
            />
        )
    )
}

export default observer(MessageList);
