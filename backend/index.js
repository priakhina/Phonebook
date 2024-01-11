const express = require('express');
const app = express();

// json-parser (https://expressjs.com/en/api.html)
// transforms the JSON data of a request into a JavaScript object;
// the parsed data is accessed via the body property of the request object (i.e., request.body)
app.use(express.json());

let contacts = [
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

const generateId = () => Math.floor(100 + Math.random() * 99901); // generating a random number [100; 100,000]

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

app.delete('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);

  response.status(204).end();
});

app.post('/api/contacts', (request, response) => {
  const body = request.body;

  const newContact = {
    ...body,
    id: generateId(),
  };

  contacts = contacts.concat(newContact);

  response.json(newContact);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
