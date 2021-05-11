import {v4 as uuid} from 'uuid';
import {extendObservable} from 'mobx';

export class Message {
    id = null;
    contactId = null; // from
    text = '';
    date = null;

    constructor(options) {
        extendObservable(this, options);
    }
}
