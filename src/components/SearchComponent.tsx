import '../styles/Search.scss';
import React from 'react';

function SearchComponent() {
  function searchBeer(e: React.MouseEvent): void {
    e.preventDefault();
  }

  return (
    <form className="search">
      <input type="text" className="search__input" />
      <button onClick={searchBeer} type="submit" className="search__button">
        🍺
      </button>
    </form>
  );
}

export default SearchComponent;
