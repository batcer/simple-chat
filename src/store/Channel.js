import {makeAutoObservable} from 'mobx';
import {Message} from './Message';
import {v4 as uuid} from 'uuid';

export class Channel {
    id = null;
    name = null;
    contactId = null;
    messages = [];
    store = null;

    constructor({id, contactId}, store) {
        makeAutoObservable(this);
        this.store = store;
        this.id = id;
        this.contactId = contactId;
        this.store = store;
    }

    addMessageWithText(text) {
        const message = new Message({
            id: uuid(),
            channelId: this.id,
            contactId: this.store.myself.id,
            text,
            date: new Date().toISOString(),
        }, this.store);
        this.messages.push(message);
        this.store.saveMessage(message);
    }
}
