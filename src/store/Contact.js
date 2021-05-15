import {v4 as uuid} from 'uuid';
import {extendObservable} from 'mobx';

export class Contact {
    id = null;
    name = null;
    store = null;

    constructor(options, store) {
        extendObservable(this, options);
        this.store = store;
    }

    isMyself() {
        return this.id === this.store?.myself?.id;
    }
}
