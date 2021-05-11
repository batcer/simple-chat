import {v4 as uuid} from 'uuid';
import {makeAutoObservable} from 'mobx';

export class Message {
    id = null;
    contactId = null; // from
    text = '';
    date = null;

    constructor() {
        makeAutoObservable(this);
    }
}
