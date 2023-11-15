const AlphabetTabs = () => {
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
        <button key={letter}>{letter}</button>
      ))}
    </div>
  );
};

export default AlphabetTabs;
