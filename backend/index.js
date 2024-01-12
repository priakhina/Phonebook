require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// json-parser (https://expressjs.com/en/api.html)
// transforms the JSON data of a request into a JavaScript object;
// the parsed data is accessed via the body property of the request object (i.e., request.body)
app.use(express.json());

// morgan (https://github.com/expressjs/morgan) is an HTTP request logger middleware for Node.js
morgan.token('data', (request, response) =>
  request.method === 'POST' ? JSON.stringify(request.body) : null
);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

// cors (https://github.com/expressjs/cors) is a middleware that enables CORS (Cross-Origin Resource Sharing) mechanism
app.use(cors());

const Contact = require('./models/contact');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  }

  next(error); // passes the error forward to the default Express error handler
};

app.get('/', (request, response) =>
  response.send('<h1>Welcome to the phonebook app!</h1>')
);

app.get('/api/contacts', (request, response) =>
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  })
);

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.statusMessage = `No contact found with the specified id (${request.params.id})`;
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/contacts', (request, response) => {
  const body = request.body;

  if (!body.name)
    return response.status(400).json({ error: 'Name is missing' });

  if (!body.number)
    return response.status(400).json({ error: 'Number is missing' });

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });

  newContact.save().then((savedContact) => {
    response.json(savedContact);
  });
});

app.put('/api/contacts/:id', (request, response, next) => {
  const body = request.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  // the optional { new: true } parameter causes the event handler to be called with the new modified person instead of the original
  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

// handler of requests with unknown endpoint (the unknown endpoint middleware)
app.use(unknownEndpoint);
// handler of requests with result to errors (the error-handling middleware);
// has to be the last loaded middleware
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
