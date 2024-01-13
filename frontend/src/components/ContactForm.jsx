import PropTypes from 'prop-types';

const ContactForm = ({
  newContactFirstName,
  newContactLastName,
  newContactNumber,
  onNewContactFirstNameChange,
  onNewContactLastNameChange,
  onNewContactNumberChange,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        First Name:{' '}
        <input
          value={newContactFirstName}
          onChange={onNewContactFirstNameChange}
        />
      </div>
      <div>
        Last Name:{' '}
        <input
          value={newContactLastName}
          onChange={onNewContactLastNameChange}
        />
      </div>
      <div>
        Number:{' '}
        <input
          type='tel'
          value={newContactNumber}
          onChange={onNewContactNumberChange}
        />
      </div>
      <div>
        <button type='submit'>Add a new contact</button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  newContactFirstName: PropTypes.string.isRequired,
  newContactLastName: PropTypes.string.isRequired,
  newContactNumber: PropTypes.string.isRequired,
  onNewContactFirstNameChange: PropTypes.func.isRequired,
  onNewContactLastNameChange: PropTypes.func.isRequired,
  onNewContactNumberChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
