import {makeAutoObservable, runInAction} from 'mobx';
import {v4 as uuid} from 'uuid';

import {Channel} from './Channel';
import {Contact} from './Contact';
import {Message} from './Message';

export class ChatStore {

    storage;

    _contacts = {};
    _channels = [];
    myself = null;

    currentChannel = null;

    constructor(storage) {
        makeAutoObservable(this);
        this.storage = new storage();
        this.authorize();
        this.loadContacts();
        this.loadChannels();
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
                this._channels[contactId] = new Channel({id: uuid(), contactId}, this);
                this.storage.addChannel(this._channels[contactId]);
            }
            this.currentChannel = this._channels[contactId];
            if (this.currentChannel.messages.length === 0) {
                this.storage.getMessages(this.currentChannel)
                    .then((fetchedMessages => {
                        console.debug(fetchedMessages);
                        this.currentChannel.messages = fetchedMessages.map(message => new Message(message, this));
                    }))
            }
        })
    }

    isCurrentContact = (contact) => {
        return !!this.currentChannel && this.currentChannel === this._channels[contact.id];
    }

    authorize = () => {
        this.storage.authorize().then(userData => {
            runInAction(() => {
                this.myself = new Contact(userData, this);
            });
        })
    }

    loadContacts = () => {
        this.storage.getContacts().then(fetchedContacts => {
            runInAction(() => {
                const contacts = fetchedContacts.reduce((acc, contact) => {
                    acc[contact.id] = new Contact(contact, this);
                    return acc;
                }, {});
                this._contacts = contacts;
            });
        })
    }

    loadChannels = () => {
        this.storage.getChannels().then(fetchedChannels => {
            runInAction(() => {
                const channels = fetchedChannels.reduce((acc, channel) => {
                    acc[channel.contactId] = new Channel(channel, this);
                    return acc;
                }, {});
                this._channels = channels;
            });
        });
    }

    saveMessage = (message) => {
        this.storage.addMessage(message);
    }
}
