import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
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
  },
});

export const { addContacts, setFilter, deleteContact } =
  contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
