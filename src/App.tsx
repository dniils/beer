import { Component } from 'react';
import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';
import BeerInterface from './types/BeerInterface';
import { getBeerData, searchBeers } from './api/api';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

interface AppProps {}

interface AppState {
  savedSearchTerm: string | null;
  beers: BeerInterface[];
}

const BEERS_PER_PAGE = 10;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      savedSearchTerm: '',
      beers: [],
    };
  }

  async componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    this.setState({ savedSearchTerm }, () => {
      this.fetchData(savedSearchTerm || '');
    });
  }

  handleSearchTermUpdate = (searchTerm: string) => {
    this.setState({ savedSearchTerm: searchTerm }, () => {
      this.fetchData(searchTerm);
    });
  };

  async fetchData(searchTerm: string) {
    try {
      const data = await (searchTerm
        ? searchBeers(searchTerm, BEERS_PER_PAGE)
        : getBeerData(1, BEERS_PER_PAGE));
      this.setState({ beers: data });
    } catch (error) {
      console.error('Error fetching beer data:', error);
    }
  }

  render() {
    const { beers, savedSearchTerm } = this.state;

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
          <SearchComponent onSearchTermUpdate={this.handleSearchTermUpdate} />
          <SearchResults beers={beers} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
