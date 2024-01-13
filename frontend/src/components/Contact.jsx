import PropTypes from 'prop-types';

const Contact = ({ contact, onContactDelete }) => (
  <div className='contact'>
    <div className='contact-details'>
      <p className='name'>
        {contact.firstName} {contact.lastName}
      </p>
      <p className='number'>{contact.number}</p>
    </div>
    <div className='contact-actions'>
      <button onClick={onContactDelete}>Delete</button>
    </div>
  </div>
);

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default Contact;
