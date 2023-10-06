import React, { Component } from 'react';
import app from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  deleteContact = conId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== conId),
    }));
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  contactFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('userContacts');
    const parsed = JSON.parse(contacts);
    if (parsed) {
      this.setState({
        contacts: parsed,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('userContacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const contactFilter = this.contactFilter();

    return (
      <div className={app.block}>
        <h1 className={app.firstTitle}>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} contacts={contacts} />

        <h2 className={app.secondTitle}>Contacts</h2>
        <Filter filter={filter} onFilterChange={this.onFilter} />
        <ContactList
          contacts={contactFilter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
