import React, {createRef, useContext} from 'react';
import {v4 as uuid} from 'uuid';

import {StoreContext} from '../context';
import {observer} from 'mobx-react';
import {Message} from '../store/Message';

import style from './MessageForm.module.css';

const MessageForm = () => {
    const {currentChannel, getContactById, myself} = useContext(StoreContext);
    if (!currentChannel) {
        return null;
    }

    const inputRef = createRef();

    const postMessage = () => {
        const text = inputRef.current.innerText;
        currentChannel.addMessageWithText(text);
        inputRef.current.innerText = '';
    }

    return (
        <div className={style.messageForm}>
            <div contentEditable="true" ref={inputRef} className={style.messageInput}/>
            <div className={style.buttonWrapper}>
                <button onClick={postMessage} className={style.sendButton}>Send</button>
            </div>
        </div>
    )
}

export default observer(MessageForm);
