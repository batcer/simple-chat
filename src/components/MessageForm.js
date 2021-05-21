import React, {createRef, useContext, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {StoreContext} from '../context';
import {autorun} from 'mobx';
import {observer} from 'mobx-react';

import style from './MessageForm.module.css';

const MessageForm = () => {
    const {currentChannel} = useContext(StoreContext);

    useEffect(() => {
        if (currentChannel) {
            clearTextInput();
        }
    }, [currentChannel])

    if (!currentChannel) {
        return null;
    }

    const inputRef = createRef();

    const clearTextInput = () => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.innerText = '';
    }

    const postMessage = () => {
        const text = inputRef.current.innerText;
        currentChannel.addMessageWithText(text);
        clearTextInput();
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
