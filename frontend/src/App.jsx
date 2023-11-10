import { useState } from 'react';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([{ name: 'John Doe' }]);
  const [newContactName, setNewContactName] = useState('');

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
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addContact}>
        <div>
          Name:{' '}
          <input
            value={newContactName}
            onChange={({ target }) => setNewContactName(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Add a new contact</button>
        </div>
      </form>
      <h2>All contacts</h2>
      <div>
        {contacts.map((contact) => (
          <p key={contact.name}>{contact.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
