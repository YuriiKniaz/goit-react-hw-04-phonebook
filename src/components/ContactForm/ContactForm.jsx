import form from './ContactForm.module.css';

import React, { useState } from 'react';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const fromReset = () => {
    setName('');
    setNumber('');
  };

  const onSubmit = e => {
    e.preventDefault();

    onAddContact(name, number);
    fromReset();
  };

  return (
    <form className={form.form} onSubmit={onSubmit}>
      <label className={form.lable}>
        Name
        <input
          className={form.formInput}
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputChange}
          value={name}
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
          onChange={onInputChange}
          value={number}
        />
      </label>
      <button className={form.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
