import { useState } from 'react';
import '../styles/Search.scss';

function removeMultipleSpaces(s: string) {
  return s.replace(/\s+/g, ' ').trim();
}

interface SearchComponentProps {
  onSearchTermUpdate: (searchTerm: string) => void;
}

function SearchComponent({ onSearchTermUpdate }: SearchComponentProps) {
  const [inputValue, setInputValue] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const searchBeer = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchTerm = (e.target as HTMLFormElement).searchInput.value;
    const cleanedSearchTerm = removeMultipleSpaces(newSearchTerm);

    setInputValue(cleanedSearchTerm);
    onSearchTermUpdate(cleanedSearchTerm);
    localStorage.setItem('searchTerm', cleanedSearchTerm);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  return (
    <form className="search" onSubmit={searchBeer}>
      <input
        type="text"
        name="searchInput"
        className="search__input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button">
        🍺
      </button>
    </form>
  );
}

export default SearchComponent;
