import PropTypes from 'prop-types';

const SearchFilter = ({ searchKeyword, onSearchKeywordChange }) => {
  return (
    <div>
      Search contacts by name:{' '}
      <input value={searchKeyword} onChange={onSearchKeywordChange} />
    </div>
  );
};

SearchFilter.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearchKeywordChange: PropTypes.func.isRequired,
};

export default SearchFilter;
