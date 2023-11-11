import PropTypes from 'prop-types';

const Contact = ({ contact }) => (
  <p>
    {contact.name} {contact.number}
  </p>
);

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
