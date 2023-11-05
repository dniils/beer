import BeerInterface from '../types/BeerInterface';

async function getBeerData(
  page: number,
  beersPerPage: number
): Promise<BeerInterface[]> {
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?per_page=${beersPerPage}&page=${page}`
  );
  const data = await response.json();
  return data;
}

async function searchBeers(
  page: number,
  searchTerm: string,
  beersPerPage: number
): Promise<BeerInterface[]> {
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}&per_page=${beersPerPage}&page=${page}`
  );
  const data = await response.json();
  return data;
}

export { getBeerData, searchBeers };
