import { useState } from 'react';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'John Doe', number: '587-123-4567' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

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
