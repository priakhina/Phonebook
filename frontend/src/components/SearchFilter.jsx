import PropTypes from 'prop-types';

const SearchFilter = ({
  searchKeyword,
  onSearchKeywordChange,
  onFormSubmit,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <input
          placeholder='Enter your search keyword'
          value={searchKeyword}
          onChange={onSearchKeywordChange}
        />
      </div>
      <div>
        <button type='submit'>Search a contact</button>
      </div>
    </form>
  );
};

SearchFilter.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearchKeywordChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchFilter;
