import {makeAutoObservable, runInAction} from 'mobx';
import {Channel} from './Channel';
import {Contact} from './Contact';
import {Message} from './Message';

export class ChatStore {
    storage;
    _contacts = {};
    _channels = [];
    currentChannel = null;
    isChannelLoading = false;
    isLoading = true;

    constructor(storage) {
        makeAutoObservable(this);
        this.storage = storage;
        this.loadContacts();
    }

    get contacts() {
        return Object.values(this._contacts);
    }

    getContactById = (contactId) => {
        return this._contacts[contactId];
    }

    setCurrentChannel = (contact) => {
        const contactId = contact.id;
        runInAction(() => {
            if (!this._channels[contactId]) {
                this._channels[contactId] = new Channel();
            }
            this.currentChannel = this._channels[contactId];
            this.isChannelLoading = true;
            this.storage.getMessages(contactId)
                .then((fetchedMessages => {
                    this.currentChannel.messages = fetchedMessages.map(message => new Message(message));
                    this.isChannelLoading = false;
                }))
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