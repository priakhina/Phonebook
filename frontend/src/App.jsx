import { useState } from 'react';
import SearchFilter from './components/SearchFilter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';

import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'John Doe', number: '587-123-4567' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);

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
