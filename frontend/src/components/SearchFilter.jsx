import PropTypes from 'prop-types';

const SearchFilter = ({
  searchKeyword,
  searchResult,
  onSearchKeywordChange,
}) => {
  return (
    <div>
      Search contacts by name:{' '}
      <input value={searchKeyword} onChange={onSearchKeywordChange} />
      <div>
        {searchResult.map((contact) => (
          <p key={contact.name}>
            {contact.name} {contact.number}
          </p>
        ))}
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
  onSearchKeywordChange: PropTypes.func.isRequired,
};

export default SearchFilter;
