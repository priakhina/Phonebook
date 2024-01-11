const express = require('express');
const app = express();

const contacts = [
  {
    id: 1,
    name: 'John Doe',
    number: '587-123-4567',
  },
  {
    id: 2,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 3,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 4,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 5,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) =>
  response.send('<h1>Welcome to the phonebook app!</h1>')
);

app.get('/api/contacts', (request, response) => response.json(contacts));

app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    response.statusMessage = `No contact found with the specified id (${id})`;
    return response.status(404).end();
  }

  response.json(contact);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
