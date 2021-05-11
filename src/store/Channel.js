import {v4 as uuid} from 'uuid';
import {makeAutoObservable} from 'mobx';

export class Channel {
    id = null;
    name = null;
    contacts = [];
    messages = [];
    store = null;

    constructor(store, id = uuid(), contacts) {
        makeAutoObservable(this);
        this.store = store;
        this.id = id;
        this.contacts = contacts;
    }

    addMessage(message) {
        this.messages.push(message);
    }
}
