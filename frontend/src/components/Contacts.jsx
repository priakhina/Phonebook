import PropTypes from 'prop-types';

const Contacts = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <p key={contact.name}>
          {contact.name} {contact.number}
        </p>
      ))}
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
