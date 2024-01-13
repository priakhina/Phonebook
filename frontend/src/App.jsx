import { useRef, useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import ContactForm from './components/ContactForm';
import AlphabetTabs from './components/AlphabetTabs';
import Contacts from './components/Contacts';
import Notification from './components/Notification';
import contactService from './services/contacts';

import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const searchKeywordInputRef = useRef(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setContacts(initialContacts));
  }, []);

  const displayNotification = (message, isError = false) => {
    setNotificationMessage(message);
    setNotificationType(isError ? 'failure' : 'success');
  };

  const handleNewContactNameChange = ({ target }) =>
    setNewContactName(target.value);

  const handleNewContactNumberChange = ({ target }) =>
    setNewContactNumber(target.value);

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

    contactService
      .create(newContact)
      .then((returnedContact) => {
        setContacts([...contacts, returnedContact]);
        setSearchResult([...searchResult, returnedContact]);

        setNewContactName('');
        setNewContactNumber('');

        displayNotification(
          `Added "${returnedContact.name}" to the phonebook.`
        );
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        displayNotification(errorMessage, true);
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
        setSearchResult(
          searchResult.map((contact) =>
            contact.id !== contactToUpdate.id ? contact : returnedContact
          )
        );

        setNewContactName('');
        setNewContactNumber('');

        displayNotification(
          `Updated ${returnedContact.name}'s phone number to ${returnedContact.number}.`
        );
      })
      .catch((error) => {
        displayNotification(
          `${contactToUpdate.name}'s contact info has already been removed from the phonebook.`,
          true
        );

        setContacts(
          contacts.filter((contact) => contact.id !== contactToUpdate.id)
        );
        setSearchResult(
          searchResult.filter((contact) => contact.id !== contactToUpdate.id)
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
        .then(() => {
          setContacts(contacts.filter((contact) => contact.id !== id));
          setSearchResult(searchResult.filter((contact) => contact.id !== id));

          displayNotification(
            `Deleted "${contactToDelete.name}" from the phonebook.`
          );
        })
        .catch((error) => {
          displayNotification(
            `${contactToDelete.name}'s contact info has already been removed from the phonebook.`,
            true
          );

          setContacts(contacts.filter((contact) => contact.id !== id));
          setSearchResult(searchResult.filter((contact) => contact.id !== id));
        });
    }
  };

  const searchContactsByName = (e) => {
    e.preventDefault();

    const searchKeyword =
      searchKeywordInputRef && searchKeywordInputRef.current
        ? searchKeywordInputRef.current.value
        : '';
    setSearchKeyword(searchKeyword);

    let matchedContacts = [];
    if (searchKeyword.trim() !== '') {
      matchedContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchKeyword.toLowerCase().trim())
      );
    }

    setSearchResult(matchedContacts);
    setIsSearchActive(true);
  };

  return (
    <div
      className={isSearchActive ? 'app-wrapper active-search' : 'app-wrapper'}
    >
      <div className='main-view'>
        <h1>Phonebook</h1>
        <h3>Manage your contacts the easy way</h3>
        <Notification message={notificationMessage} type={notificationType} />
        <SearchFilter
          ref={searchKeywordInputRef}
          onFormSubmit={searchContactsByName}
        />
        <ContactForm
          newContactName={newContactName}
          newContactNumber={newContactNumber}
          onNewContactNameChange={handleNewContactNameChange}
          onNewContactNumberChange={handleNewContactNumberChange}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      <div className='contacts-view'>
        <AlphabetTabs />
        <Contacts
          contacts={searchResult}
          searchKeyword={searchKeyword}
          onContactDelete={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
