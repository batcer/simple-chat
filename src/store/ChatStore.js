import {makeAutoObservable, runInAction} from 'mobx';
import {Channel} from './Channel';
import {Contact} from './Contact';
import {Message} from './Message';

export class ChatStore {

    storage;

    _contacts = {};
    _channels = [];
    myself = null;

    currentChannel = null;
    isChannelLoading = false;
    isLoading = true;

    constructor(storage) {
        makeAutoObservable(this);
        this.storage = storage;
        this.authorize();
        this.loadContacts();
    }

    get contacts() {
        return Object.values(this._contacts);
    }

    getContactById = (contactId) => {
        return this._contacts[contactId];
    }

    setCurrentContact = (contact) => {
        const contactId = contact.id;
        runInAction(() => {
            if (!this._channels[contactId]) {
                this._channels[contactId] = new Channel();
            }
            this.currentChannel = this._channels[contactId];
            this.isChannelLoading = true;
            this.storage.getMessages(contactId)
                .then((fetchedMessages => {
                    this.currentChannel.messages = fetchedMessages.map(message => new Message(message, this));
                    this.isChannelLoading = false;
                }))
        })
    }

    isCurrentContact = (contact) => {
        return !!this.currentChannel &&  this.currentChannel === this._channels[contact.id];
    }

    authorize = () => {
        this.isLoading = true;
        this.storage.authorize().then(userData => {
            runInAction(() => {
                this.myself = new Contact(userData, this);
                this.isLoading = false;
            });
        })
    }

    loadContacts = () => {
        this.isLoading = true;
        this.storage.getContacts().then(fetchedContacts => {
            runInAction(() => {
                const contacts = fetchedContacts.reduce((acc, contact) => {
                    acc[contact.id] = new Contact(contact, this);
                    return acc;
                }, {});
                this._contacts = contacts;
                this.isLoading = false;
            });
        })
    }
}