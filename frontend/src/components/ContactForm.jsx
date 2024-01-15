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
    <form id='contact-form' onSubmit={onFormSubmit}>
      <div className='form-fields'>
        <div className='form-field'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            id='firstName'
            value={newContactFirstName}
            onChange={onNewContactFirstNameChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            id='lastName'
            value={newContactLastName}
            onChange={onNewContactLastNameChange}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='phoneNumber'>Number:</label>
          <input
            id='phoneNumber'
            type='tel'
            value={newContactNumber}
            onChange={onNewContactNumberChange}
          />
        </div>
      </div>
      <button type='submit'>Add this contact</button>
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
