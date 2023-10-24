import '../styles/Search.scss';

function SearchComponent() {
  return (
    <form className="search">
      <input type="text" className="search__input" />
      <button type="submit" className="search__button">
        🍺
      </button>
    </form>
  );
}

export default SearchComponent;
