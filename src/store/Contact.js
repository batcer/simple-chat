import {v4 as uuid} from 'uuid';
import {extendObservable} from 'mobx';

export class Contact {
    id = null;
    name = null;
    isMyself = false;
    store = null;

    constructor(options, store) {
        extendObservable(this, options);
        this.store = store;
    }
}
