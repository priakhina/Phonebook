import { useState } from 'react';
import SearchFilter from './components/SearchFilter';

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
      <form onSubmit={addContact}>
        <div>
          Name:{' '}
          <input
            value={newContactName}
            onChange={({ target }) => setNewContactName(target.value)}
          />
        </div>
        <div>
          Number:{' '}
          <input
            type='tel'
            value={newContactNumber}
            onChange={({ target }) => setNewContactNumber(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Add a new contact</button>
        </div>
      </form>
      <h2>All contacts</h2>
      <div>
        {contacts.map((contact) => (
          <p key={contact.name}>
            {contact.name} {contact.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
