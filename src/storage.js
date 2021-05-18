import Dexie from 'dexie';

export default class Storage {

    constructor() {
        this.db = new Dexie('ChatDB');
        this.db.version(1).stores({
            channels: 'id,contactId',
            messages: 'id,channelId,contactId,text,date'
        });
        // TODO: use db.on("populate", function () {}); to populate DB with mock data
        // https://dexie.org/docs/Dexie/Dexie.on.populate
    }

    getContacts = () => {
        return Promise.resolve([{
            id: '3a9f0fb8-66ad-4515-8fde-08ac1dade627',
            name: 'Andy Bergman'
        }, {
            id: '7970f455-9dac-4737-823e-a56c5970f363',
            name: 'Cliff Diamond'
        }, {
            id: '31f51bef-1abe-44be-a4fc-2f8ad1141bbe',
            name: 'Mikhail Batcer'
        }])
    }

    getChannels = () => {
        return this.db.channels.toArray();
    }

    addChannel = (channel) => {
        const {id, contactId} = channel;
        return this.insertIntoTable('channels', {id, contactId});
    }

    addMessage = (message) => {
        const {id, channelId, contactId, text, date} = message;
        return this.insertIntoTable('messages', {id, channelId, contactId, text, date});
    }

    authorize = () => {
        return Promise.resolve({
            id: '31f51bef-1abe-44be-a4fc-2f8ad1141bbe',
            name: 'Mikhail Batcer'
        })
    }

    getMessages = (channel) => {
        return this.db.messages.where('channelId').equals(channel.id).toArray();
        const messages = {
            '3a9f0fb8-66ad-4515-8fde-08ac1dade627': [{
                id: 'ca11c98b-7473-4e11-bf8b-92bca80cc9e8',
                contactId: '3a9f0fb8-66ad-4515-8fde-08ac1dade627',
                text: 'Hi Mike',
                date: '2021-05-02T13:24:00'
            }, {
                id: '2a582989-68a4-48d4-a2ff-fe228d616a87',
                contactId: '31f51bef-1abe-44be-a4fc-2f8ad1141bbe',
                text: 'Hi Andy',
                date: '2021-05-02T13:24:20'
            }],
            '7970f455-9dac-4737-823e-a56c5970f363': [{
                id: 'f96f2f8f-c7ad-44b2-93dd-b2de55a40d95',
                contactId: '31f51bef-1abe-44be-a4fc-2f8ad1141bbe',
                text: 'Hi Cliff',
                date: '2021-05-01T13:24:00'
            }, {
                id: '8362170f-2a54-4621-b766-c1e385bce8d2',
                contactId: '7970f455-9dac-4737-823e-a56c5970f363',
                text: 'Hi Mike',
                date: '2021-05-01T16:24:20'
            }]
        }
    }

    getTable = (tableName) => {
        return this.db.table(tableName).toArray();
    }

    insertIntoTable = (tableName, item) => {
        return this.db.table(tableName).add(item)
            /*.then(id => {
                return this.db.table(tableName).get(id)
            })*/
            .catch(error => {
                console.error('Local DB error: ', error.stack || error)
            })
    }
}
