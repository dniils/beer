import './styles/App.css';
import SearchComponent from './components/SearchComponent';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="app-container">
      <SearchComponent />
      <SearchResults />
    </div>
  );
}

export default App;
