import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';
import {
  addContacts,
  deleteContact,
  setFilter,
} from 'redux/contactFormReducer.js';

export const App = () => {
  const contacts = useSelector(state => state.contactForm.contacts);
  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem('contacts')) ?? [];
  // });
  // const [filter, setFilter] = useState('');
  const filter = useSelector(state => state.contactForm.filter);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const formSubmitHandler = data => {
    dispatch(addContacts({ ...data, id: nanoid() }));
    // setContacts(prev => [...prev, { ...data, id: nanoid() }]);
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
    // setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
    // setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div
      style={{
        width: '300px',
        padding: '15px',
        margin: 'auto',
        alignContent: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {getFilteredContacts().length > 0 && (
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};
