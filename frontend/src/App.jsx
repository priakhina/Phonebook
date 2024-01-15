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
  const [newContactFirstName, setNewContactFirstName] = useState('');
  const [newContactLastName, setNewContactLastName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLetter, setSearchLetter] = useState('');
  const [searchLetterBackgroundColor, setSearchLetterBackgroundColor] =
    useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchByKeyword, setIsSearchByKeyword] = useState(true);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const hideWhenVisible = { display: isContactFormVisible ? 'none' : '' };
  const showWhenVisible = { display: isContactFormVisible ? '' : 'none' };
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

  const handleNewContactFirstNameChange = ({ target }) =>
    setNewContactFirstName(target.value);

  const handleNewContactLastNameChange = ({ target }) =>
    setNewContactLastName(target.value);

  const handleNewContactNumberChange = ({ target }) =>
    setNewContactNumber(target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newContactFullName = `${newContactFirstName.trim()} ${newContactLastName.trim()}`;

    const duplicateContact = contacts.find(
      (contact) => contact.fullName === newContactFullName
    );

    if (duplicateContact) {
      const shouldUpdate = window.confirm(
        `"${newContactFullName}" is already added to the phonebook. Replace the old number with a new one?`
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
      firstName: newContactFirstName.trim(),
      lastName: newContactLastName.trim(),
      fullName: `${newContactFirstName.trim()} ${newContactLastName.trim()}`,
      number: newContactNumber.trim(),
    };

    contactService
      .create(newContact)
      .then((returnedContact) => {
        setContacts([...contacts, returnedContact]);
        setSearchResult([...searchResult, returnedContact]);

        setNewContactFirstName('');
        setNewContactLastName('');
        setNewContactNumber('');

        displayNotification(
          `Added "${returnedContact.fullName}" to the phonebook.`
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

        setNewContactFirstName('');
        setNewContactLastName('');
        setNewContactNumber('');

        displayNotification(
          `Updated ${returnedContact.fullName}'s phone number to ${returnedContact.number}.`
        );
      })
      .catch((error) => {
        displayNotification(
          `${contactToUpdate.fullName}'s contact info has already been removed from the phonebook.`,
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
      `Are you sure you want to remove "${contactToDelete.fullName}" from the phonebook?`
    );

    if (shouldDelete) {
      contactService
        .remove(id)
        .then(() => {
          setContacts(contacts.filter((contact) => contact.id !== id));
          setSearchResult(searchResult.filter((contact) => contact.id !== id));

          displayNotification(
            `Deleted "${contactToDelete.fullName}" from the phonebook.`
          );
        })
        .catch((error) => {
          displayNotification(
            `${contactToDelete.fullName}'s contact info has already been removed from the phonebook.`,
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
        contact.fullName
          .toLowerCase()
          .includes(searchKeyword.toLowerCase().trim())
      );
    }

    setSearchResult(matchedContacts);
    setIsSearchActive(true);
    setIsSearchByKeyword(true);
  };

  const filterContactsByFirstLetter = (letter, letterBackgroundColor) => {
    setSearchLetter(letter);
    setSearchLetterBackgroundColor(letterBackgroundColor);

    let matchedContacts = contacts.filter((contact) =>
      contact.firstName.toLowerCase().startsWith(letter.toLowerCase())
    );

    setSearchResult(matchedContacts);
    setIsSearchActive(true);
    setIsSearchByKeyword(false);
  };

  return (
    <div
      className={isSearchActive ? 'app-wrapper active-search' : 'app-wrapper'}
    >
      <div className='main-view'>
        <h1>Phonebook</h1>
        <h3>Manage your contacts the easy way</h3>
        <Notification message={notificationMessage} type={notificationType} />
        <div style={hideWhenVisible}>
          <SearchFilter
            ref={searchKeywordInputRef}
            onFormSubmit={searchContactsByName}
          />
          <p style={{ margin: '5px 0' }}>OR</p>
          <button onClick={() => setIsContactFormVisible(true)}>
            Add a new contact
          </button>
        </div>
        <div style={showWhenVisible}>
          <ContactForm
            newContactFirstName={newContactFirstName}
            newContactLastName={newContactLastName}
            newContactNumber={newContactNumber}
            onNewContactFirstNameChange={handleNewContactFirstNameChange}
            onNewContactLastNameChange={handleNewContactLastNameChange}
            onNewContactNumberChange={handleNewContactNumberChange}
            onFormSubmit={handleFormSubmit}
          />
          <p style={{ margin: '5px 0' }}>OR</p>
          <button onClick={() => setIsContactFormVisible(false)}>
            Go back to search a contact
          </button>
        </div>
      </div>
      <div
        className='contacts-view'
        style={{
          backgroundColor: isSearchByKeyword
            ? '#fff'
            : searchLetterBackgroundColor,
        }}
      >
        <AlphabetTabs
          isSearchByKeyword={isSearchByKeyword}
          onClick={filterContactsByFirstLetter}
        />
        <Contacts
          contacts={searchResult}
          isSearchByKeyword={isSearchByKeyword}
          searchKeyword={searchKeyword}
          searchLetter={searchLetter}
          searchLetterBackgroundColor={searchLetterBackgroundColor}
          onContactDelete={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
