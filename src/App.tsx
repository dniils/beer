import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.scss';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';
import BeerInterface from './types/BeerInterface';
import { getBeerData, searchBeers } from './api/api';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

function App() {
  const [savedSearchTerm, setSavedSearchTerm] = useState<string | null>('');
  const [beers, setBeers] = useState<BeerInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [beersPerPage, setBeersPerPage] = useState<number>(2);
  const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(true);

  const fetchData = useCallback(
    async (searchTerm: string, pageNumber: number) => {
      try {
        const data = await (searchTerm
          ? searchBeers(pageNumber, searchTerm, beersPerPage)
          : getBeerData(pageNumber, beersPerPage));

        if (data.length) {
          setNextButtonEnabled(true);
        } else {
          setNextButtonEnabled(false);
        }
        setBeers(data);
      } catch (error) {
        console.error('Error fetching beer data:', error);
      }
    },
    [beersPerPage]
  );

  const handleSearchTermUpdate = (searchTerm: string) => {
    setSavedSearchTerm(searchTerm);
    setPage(1);
    fetchData(searchTerm, page);
  };

  const handleBeersPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(1);
    const newBeersAmountPerPage: number = +event.target.value;
    setBeersPerPage(newBeersAmountPerPage);
  };

  useEffect(() => {
    const initialSearchTerm = localStorage.getItem('searchTerm') || '';
    setSavedSearchTerm(initialSearchTerm);
    fetchData(initialSearchTerm, page);
  }, [page, beersPerPage, fetchData]);

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
          <li>
            <span>Beers per page (min: 1, max: 20): </span>
            <input
              style={{ color: 'blue' }}
              type="number"
              id="beersPerPage"
              name="beers-per-page"
              min="1"
              max="20"
              value={beersPerPage}
              onChange={handleBeersPerPageChange}
            />
          </li>
          <li>
            <ErrorButton />
          </li>
        </ul>
        <SearchComponent onSearchTermUpdate={handleSearchTermUpdate} />
        <SearchResults beers={beers} />

        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
        >
          {beers.length === 0 &&
            `Seems like that's all we got for your search term!`}
        </div>

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
