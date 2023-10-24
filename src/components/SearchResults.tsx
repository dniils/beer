import { useState } from 'react';
import BeerPreview from './BeerPreview';
import '../styles/SearchResults.scss';
import beerData from '../beerData.json';

function SearchResults() {
  const [beers] = useState([...beerData]);

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
