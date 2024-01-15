import { useRef } from 'react';
import PropTypes from 'prop-types';

const AlphabetTabs = ({ onClick }) => {
  const previousActiveTab = useRef(null);

  const backgroundColors = [
    '#ff7518',
    '#ffcba4',
    '#ff8700',
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
      {generateCharArray('A', 'Z').map((letter, index) => {
        const backgroundColor =
          backgroundColors[index % backgroundColors.length];
        return (
          <button
            key={letter}
            style={{
              backgroundColor,
              borderRightColor: '#fff',
            }}
            onClick={(e) => {
              if (previousActiveTab.current) {
                previousActiveTab.current.style.borderRightColor = '#fff';
              }
              e.target.style.borderRightColor = backgroundColor;
              previousActiveTab.current = e.target;
              onClick(letter, backgroundColor);
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

AlphabetTabs.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AlphabetTabs;
