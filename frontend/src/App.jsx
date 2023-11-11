import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from './components/SearchFilter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';

import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/contacts')
      .then((response) => setContacts(response.data));
  }, []);

  const handleNewContactNameChange = ({ target }) =>
    setNewContactName(target.value);

  const handleNewContactNumberChange = ({ target }) =>
    setNewContactNumber(target.value);

  const addContact = (e) => {
    e.preventDefault();

    const containsSameName = contacts.some(
      (contact) => contact.name === newContactName.trim()
    );

    if (containsSameName) {
      alert(`"${newContactName.trim()}" is already added to the phonebook!`);
      return;
    }

    const newContact = {
      name: newContactName.trim(),
      number: newContactNumber.trim(),
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactNumber('');
  };

  const searchContactsByName = ({ target }) => {
    setSearchKeyword(target.value);

    let matchedContacts = [];
    if (target.value.trim() !== '') {
      matchedContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(target.value.toLowerCase().trim())
      );
    }
    setSearchResult(matchedContacts);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter
        searchKeyword={searchKeyword}
        searchResult={searchResult}
        onSearchKeywordChange={searchContactsByName}
      />
      <ContactForm
        newContactName={newContactName}
        newContactNumber={newContactNumber}
        onNewContactNameChange={handleNewContactNameChange}
        onNewContactNumberChange={handleNewContactNumberChange}
        onFormSubmit={addContact}
      />
      <h2>All contacts</h2>
      <Contacts contacts={contacts} />
    </div>
  );
};

export default App;
