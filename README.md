# Phonebook

Phonebook is a full-stack application with CRUD functionality for managing phone contacts.

The frontend is created with React.js, the backend is implemented on top of Node.js with the help of the Express library, and the application's data is stored in a MongoDB database.

## Project demo

An online version of the Phonebook app can be accessed via [https://full-stack-phonebook-app.onrender.com](https://full-stack-phonebook-app.onrender.com).

## Functionality

The app provides users with the following functionality:

- Adding new contacts to the phonebook (each entry consists of a first name, last name, and phone number)
  - if a number is added to an already existing contact, the new number will replace the old number
- Deleting existing contacts from the phonebook
- Filtering the list of contacts by keyword
- Filtering the list of contacts by the first letter in the first name (by clicking on the corresponding alphabetical tabs)

### Input validation

To ensure the correctness of the input data, there have been defined specific validation rules for the input fields:

1. Both first name and last name must be at least three characters long. 
2. A phone number must:
    - have a length of 8 or more
    - be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
        - eg. 09-1234556 and 040-22334455 are valid phone numbers
        - eg. 1234556, 1-22334455 and 10-22-334455 are invalid

When a validation error occurs, the app notifies the user by displaying a corresponding message.
