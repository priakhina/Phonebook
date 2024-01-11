import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const SearchFilter = forwardRef((props, ref) => {
  return (
    <form className='search-filter' onSubmit={props.onFormSubmit}>
      <div>
        <input
          className='keyword-input'
          placeholder='Enter your search keyword'
          ref={ref}
        />
      </div>
      <div>
        <button type='submit'>Search a contact</button>
      </div>
    </form>
  );
});

SearchFilter.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchFilter;
