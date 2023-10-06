import form from './ContactForm.module.css';

import React, { Component } from 'react';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  fromReset = () => {
    this.setState({ name: '', number: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const isExist = this.props.contacts.some(
      con => con.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already exist`);
      return;
    }
    this.props.onAddContact(name, number);
    this.fromReset();
  };

  render() {
    return (
      <form className={form.form} onSubmit={this.onSubmit}>
        <label className={form.lable}>
          Name
          <input
            className={form.formInput}
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onInputChange}
            value={this.state.name}
          />
        </label>
        <label className={form.lable}>
          Number
          <input
            className={form.formInput}
            type="tel"
            name="number"
            // pattern="\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onInputChange}
            value={this.state.number}
          />
        </label>
        <button className={form.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
