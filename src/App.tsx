import { useState, useEffect } from 'react';
import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';
import BeerInterface from './types/BeerInterface';
import { getBeerData, searchBeers } from './api/api';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

const BEERS_PER_PAGE = 10;

function App() {
  const [savedSearchTerm, setSavedSearchTerm] = useState<string | null>('');
  const [beers, setBeers] = useState<BeerInterface[]>([]);

  const fetchData = async (searchTerm: string) => {
    try {
      const data = await (searchTerm
        ? searchBeers(searchTerm, BEERS_PER_PAGE)
        : getBeerData(1, BEERS_PER_PAGE));
      setBeers(data);
    } catch (error) {
      console.error('Error fetching beer data:', error);
    }
  };

  const handleSearchTermUpdate = (searchTerm: string) => {
    setSavedSearchTerm(searchTerm);
    fetchData(searchTerm);
  };

  useEffect(() => {
    setSavedSearchTerm(localStorage.getItem('searchTerm') || '');
    fetchData(savedSearchTerm || '');
  }, [savedSearchTerm]);

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
      </div>
    </ErrorBoundary>
  );
}

export default App;
