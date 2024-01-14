import PropTypes from 'prop-types';

const AlphabetTabs = ({ onClick }) => {
  const backgroundColors = [
    '#ffcba4',
    '#ff8700',
    '#ff7518',
    '#ff6600',
    '#e2725b',
  ];

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
      {generateCharArray('A', 'Z').map((letter, index) => (
        <button
          key={letter}
          style={{
            backgroundColor: backgroundColors[index % backgroundColors.length],
          }}
          onClick={() => onClick(letter)}
        >
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
