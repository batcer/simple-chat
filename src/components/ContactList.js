import React, {useContext} from 'react';

import {StoreContext} from '../context';
import {observer} from 'mobx-react';

const ContactItem = ({contact, clickHandler}) => {
    return (
        <div onClick={clickHandler}>{contact.name}</div>
    )
}

const ContactList = () => {
    const {contacts, setCurrentChannel} = useContext(StoreContext);
    return (
        contacts.filter(contact => !contact.isMyself).map(contact =>
            <ContactItem
                contact={contact} key={contact.id}
                clickHandler={() => setCurrentChannel(contact)}
            />
        )
    )
}

export default observer(ContactList);
