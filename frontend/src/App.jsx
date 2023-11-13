import { useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import SearchResult from './components/SearchResult';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import contactService from './services/contacts';

import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setContacts(initialContacts));
  }, []);

  const handleNewContactNameChange = ({ target }) =>
    setNewContactName(target.value);

  const handleNewContactNumberChange = ({ target }) =>
    setNewContactNumber(target.value);

  const handleSearchKeywordChange = ({ target }) =>
    setSearchKeyword(target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const duplicateContact = contacts.find(
      (contact) => contact.name === newContactName.trim()
    );

    if (duplicateContact) {
      const shouldUpdate = window.confirm(
        `"${newContactName.trim()}" is already added to the phonebook. Replace the old number with a new one?`
      );

      if (shouldUpdate) {
        updateContactNumber(duplicateContact);
      }
    } else {
      addContact();
    }
  };

  const addContact = () => {
    const newContact = {
      name: newContactName.trim(),
      number: newContactNumber.trim(),
    };

    contactService.create(newContact).then((returnedContact) => {
      setContacts([...contacts, returnedContact]);
      setNewContactName('');
      setNewContactNumber('');
    });
  };

  const updateContactNumber = (contactToUpdate) => {
    const changedContact = { ...contactToUpdate, number: newContactNumber };

    contactService
      .update(contactToUpdate.id, changedContact)
      .then((returnedContact) => {
        setContacts(
          contacts.map((contact) =>
            contact.id !== contactToUpdate.id ? contact : returnedContact
          )
        );

        setNewContactName('');
        setNewContactNumber('');
      })
      .catch((error) => {
        console.log(error);
        alert(
          `"${contactToUpdate.name.trim()}" was already deleted from the phonebook!`
        );
        setContacts(
          contacts.filter((contact) => contact.id !== contactToUpdate.id)
        );
      });
  };

  const deleteContact = (id) => {
    const contactToDelete = contacts.find((contact) => contact.id === id);
    const shouldDelete = window.confirm(
      `Are you sure you want to remove "${contactToDelete.name}" from the phonebook?`
    );

    if (shouldDelete) {
      contactService
        .remove(id)
        .then(() =>
          setContacts(contacts.filter((contact) => contact.id !== id))
        )
        .catch((error) => {
          console.log(error);
          alert(
            `"${contactToDelete.name}" is already deleted from the phonebook!`
          );
          setContacts(contacts.filter((contact) => contact.id !== id));
        });
    }
  };

  const searchContactsByName = (e) => {
    e.preventDefault();

    let matchedContacts = [];
    if (searchKeyword.trim() !== '') {
      matchedContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchKeyword.toLowerCase().trim())
      );
    }
    setSearchResult(matchedContacts);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter
        searchKeyword={searchKeyword}
        onSearchKeywordChange={handleSearchKeywordChange}
        onFormSubmit={searchContactsByName}
      />
      <SearchResult searchResult={searchResult} />
      <ContactForm
        newContactName={newContactName}
        newContactNumber={newContactNumber}
        onNewContactNameChange={handleNewContactNameChange}
        onNewContactNumberChange={handleNewContactNumberChange}
        onFormSubmit={handleFormSubmit}
      />
      <h2>All contacts</h2>
      <Contacts contacts={contacts} onContactDelete={deleteContact} />
    </div>
  );
};

export default App;
