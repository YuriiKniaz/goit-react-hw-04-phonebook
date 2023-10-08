import React, { useEffect, useState, useMemo } from 'react';
import app from './App.module.css';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const isExist = contacts.some(
      con => con.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already exist`);
      return;
    }

    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = conId => {
    setContacts(prev => {
      prev.filter(con => con.id !== conId);
    });
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  const contactFilter = useMemo(() => {
    return contacts.filter(contact => {
      console.log(contact);
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [contacts, filter]);

  useEffect(() => {
    const contacts = localStorage.getItem('userContacts');
    const parsed = JSON.parse(contacts);
    if (parsed) {
      setContacts(parsed);
    }
  }, []);

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      localStorage.setItem('userContacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  // componentDidMount() {
  //
  // }

  // componentDidUpdate(_, prevState) {
  //
  // }

  return (
    <div className={app.block}>
      <h1 className={app.firstTitle}>Phonebook</h1>
      <ContactForm onAddContact={addContact} contacts={contacts} />

      <h2 className={app.secondTitle}>Contacts</h2>
      <Filter filter={filter} onFilterChange={onFilter} />
      <ContactList contacts={contactFilter} deleteContact={deleteContact} />
    </div>
  );
};
