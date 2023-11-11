import PropTypes from 'prop-types';

const Contact = ({ contact, onContactDelete }) => (
  <p>
    {contact.name} {contact.number}{' '}
    <button onClick={onContactDelete}>Delete</button>
  </p>
);

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default Contact;
