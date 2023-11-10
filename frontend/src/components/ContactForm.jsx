import PropTypes from 'prop-types';

const ContactForm = ({
  newContactName,
  newContactNumber,
  onNewContactNameChange,
  onNewContactNumberChange,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        Name: <input value={newContactName} onChange={onNewContactNameChange} />
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
  newContactName: PropTypes.string.isRequired,
  newContactNumber: PropTypes.string.isRequired,
  onNewContactNameChange: PropTypes.func.isRequired,
  onNewContactNumberChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
