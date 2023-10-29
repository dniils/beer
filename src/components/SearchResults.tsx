import '../styles/SearchResults.scss';
import BeerPreview from './BeerPreview';
import BeerInterface from '../types/BeerInterface';

function SearchResults({ beers }: { beers: BeerInterface[] }) {
  return (
    <div className="search-results">
      {beers.map((beer) => (
        <BeerPreview
          beer={{
            id: beer.id,
            name: beer.name,
            description: beer.description,
            image_url: beer.image_url,
          }}
          key={beer.id}
        />
      ))}
    </div>
  );
}

export default SearchResults;
