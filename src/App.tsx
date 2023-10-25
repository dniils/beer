import { Component } from 'react';
import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';
import BeerInterface from './types/BeerInterface';
import getBeerData from './api/api';

interface AppProps {}

interface AppState {
  beers: BeerInterface[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      beers: [],
    };
  }

  async componentDidMount() {
    try {
      const data = await getBeerData(1, 10);
      this.setState({ beers: data });
    } catch (error) {
      console.error('Error fetching beer data:', error);
    }
  }

  render() {
    const { beers } = this.state;

    return (
      <div className="app-container">
        <SearchComponent />
        <SearchResults beers={beers} />
      </div>
    );
  }
}

export default App;
