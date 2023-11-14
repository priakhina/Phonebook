import PropTypes from 'prop-types';
import Contact from './Contact';

const Contacts = ({ contacts, searchKeyword, onContactDelete }) => {
  return (
    <div className='contacts'>
      <h2>
        {contacts.length} {contacts.length > 1 ? 'Results' : 'Result'}
      </h2>
      <div className='keyword'>
        Keyword <br /> <span>{searchKeyword}</span>
      </div>
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
  searchKeyword: PropTypes.string.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default Contacts;
