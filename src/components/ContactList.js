import React, {useContext} from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

import {StoreContext} from '../context';

import styles from './ContactList.module.css';

const ContactItem = ({contact, isActive, clickHandler}) => {
    const classNames = classnames(styles.contact, {[styles.activeContact]: isActive});
    return (
        <div onClick={clickHandler} className={classNames}>{contact.name}</div>
    )
}

const ContactList = () => {
    const {contacts, isCurrentContact, setCurrentContact} = useContext(StoreContext);
    return (
        contacts.filter(contact => !contact.isMyself()).map(contact =>
            <ContactItem
                contact={contact} key={contact.id}
                clickHandler={() => setCurrentContact(contact)}
                isActive={isCurrentContact(contact)}
            />
        )
    )
}

export default observer(ContactList);
