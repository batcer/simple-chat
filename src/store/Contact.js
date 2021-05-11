import {v4 as uuid} from 'uuid';
import {makeAutoObservable} from 'mobx';

export class Contact {
    id = null;
    name = null;
    isMyself = false;
    store = null;

    constructor(store, id = uuid()) {
        makeAutoObservable(this);
        this.store = store;
        this.id = id;
    }
}
