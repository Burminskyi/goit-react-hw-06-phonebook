import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactList.module.css';
import { deleteContact } from 'redux/contactFormReducer';
import { selectContacts, selectFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  if (!filteredContacts().length) return null;

  return (
    <ul className={styles.contactList}>
      {filteredContacts().map(contact => {
        const { id, name, number } = contact;
        return (
          <li className={styles.contactListItem} key={id}>
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              className={styles.contactListBtn}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
