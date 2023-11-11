import PropTypes from 'prop-types';
import Contact from './Contact';

const Contacts = ({ contacts, onContactDelete }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onContactDelete={() => onContactDelete(contact.id)}
        />
      ))}
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default Contacts;
