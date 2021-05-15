import {extendObservable} from 'mobx';

export class Message {
    id = null;
    contactId = null; // from
    text = '';
    date = null;
    store = null;

    constructor(options, store) {
        extendObservable(this, options);
        this.store = store;
    }

    isMine() {
        return this.contactId === this.store.myself?.id;
    }
}
