import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
  name: '',
  number: '',
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    addContacts: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { addContacts, setFilter, setName, setNumber, deleteContact } =
  contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
