const http = require('http');

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(contacts));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
