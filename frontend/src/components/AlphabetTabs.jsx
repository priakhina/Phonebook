import PropTypes from 'prop-types';

const AlphabetTabs = ({ onClick }) => {
  const generateCharArray = (charA, charZ) => {
    let arr = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      arr.push(String.fromCharCode(i));
    }
    return arr;
  };

  return (
    <div className='alphabet-tabs'>
      {generateCharArray('A', 'Z').map((letter) => (
        <button key={letter} onClick={() => onClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

AlphabetTabs.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AlphabetTabs;
