import { FaSearch, FaTimes } from "react-icons/fa";
import React, { useState } from 'react';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <form style={{ textAlign: 'center' }}>
        <input type="text"
          style={{ textAlign: 'center', width: '10cm', height: '1cm', fontSize: '20px' }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : 'What are you looking for?'} />
      </form>
      <FaSearch size='1cm' style={{ marginLeft: '5px', color: '#000' }} />

    </div>

  );
}

export default SearchBar;