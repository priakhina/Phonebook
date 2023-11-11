import PropTypes from 'prop-types';
import Contact from './Contact';

const Contacts = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.name} contact={contact} />
      ))}
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
