import { useState, useEffect } from 'react';
import './styles/App.scss';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';
import BeerInterface from './types/BeerInterface';
import { getBeerData, searchBeers } from './api/api';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

const BEERS_PER_PAGE = 2;

function App() {
  const [savedSearchTerm, setSavedSearchTerm] = useState<string | null>('');
  const [beers, setBeers] = useState<BeerInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(true);

  async function fetchData(searchTerm: string, pageNumber: number) {
    try {
      const data = await (searchTerm
        ? searchBeers(pageNumber, searchTerm, BEERS_PER_PAGE)
        : getBeerData(pageNumber, BEERS_PER_PAGE));

      if (data.length) {
        setBeers(data);
      } else {
        setNextButtonEnabled(false);
      }
    } catch (error) {
      console.error('Error fetching beer data:', error);
    }
  }

  const handleSearchTermUpdate = (searchTerm: string) => {
    setSavedSearchTerm(searchTerm);
    setPage(1);
    fetchData(searchTerm, page);
  };

  useEffect(() => {
    const initialSearchTerm = localStorage.getItem('searchTerm') || '';
    setSavedSearchTerm(initialSearchTerm);
    fetchData(initialSearchTerm, page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <ul className="app-info">
          <li>Search Term: {`"${savedSearchTerm}"`}</li>
          <li>BEERS_PER_PAGE: {BEERS_PER_PAGE}</li>
          <li>
            <ErrorButton />
          </li>
        </ul>
        <SearchComponent onSearchTermUpdate={handleSearchTermUpdate} />
        <SearchResults beers={beers} />
        <div className="buttons">
          <button
            type="button"
            className="buttons__prev"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            ◀
          </button>
          <button
            type="button"
            className="buttons__next"
            onClick={handleNextPage}
            disabled={!nextButtonEnabled}
          >
            ▶
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
