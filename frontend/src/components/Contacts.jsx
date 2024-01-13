import PropTypes from 'prop-types';
import Contact from './Contact';

const Contacts = ({
  contacts,
  isSearchByKeyword,
  searchKeyword,
  searchLetter,
  onContactDelete,
}) => {
  return (
    <div className='contacts'>
      {isSearchByKeyword ? (
        <div className='search-by-keyword-info'>
          <h2>
            {contacts.length}{' '}
            {contacts.length === 0 || contacts.length > 1
              ? 'Results'
              : 'Result'}
          </h2>
          <div className='keyword'>
            Keyword <br /> <span>{searchKeyword}</span>
          </div>
        </div>
      ) : (
        <div className='search-by-letter-info'>
          <h2>{searchLetter}</h2>
          <h5>
            <span>
              {contacts.length}{' '}
              {contacts.length === 0 || contacts.length > 1
                ? 'people'
                : 'person'}
            </span>
            <span>
              with{' '}
              {contacts.length === 0 || contacts.length > 1
                ? 'names'
                : 'a name'}{' '}
              started by this letter
            </span>
          </h5>
        </div>
      )}
      <div className='contacts-list'>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onContactDelete={() => onContactDelete(contact.id)}
          />
        ))}
      </div>
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  isSearchByKeyword: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  searchLetter: PropTypes.string.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default Contacts;
