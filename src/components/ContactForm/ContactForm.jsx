import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactFormReducer';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'name') {
      setName(value);
      return;
    }
    if (name === 'number') {
      setNumber(value);
      return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isInContacts = contacts.some(
      contacts => contacts.name.toLowerCase() === name.toLowerCase()
    );

    if (isInContacts) {
      alert('This contact is already exist');
      return;
    }

    dispatch(addContacts({ name, number, id: nanoid() }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.phoneForm}
      name="signup_form"
      autoComplete="on"
    >
      <div className={styles.phoneFormWrap}>
        <label htmlFor={nameInputId} className={styles.contactFormLabel}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          className={styles.contactFormInput}
          id={nameInputId}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <label htmlFor={numberInputId} className={styles.contactFormLabel}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          value={number}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={styles.contactFormInput}
          id={numberInputId}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.phoneFormBtn}>
        Add contact
      </button>
    </form>
  );
};
