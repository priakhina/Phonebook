import PropTypes from 'prop-types';

const SearchResult = ({ searchResult }) => {
  return (
    <div>
      {searchResult.map((contact) => (
        <p key={contact.name}>
          {contact.name} {contact.number}
        </p>
      ))}
    </div>
  );
};

SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired,
};

export default SearchResult;
