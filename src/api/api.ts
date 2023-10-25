import BeerInterface from '../types/BeerInterface';

export default async function getBeerData(
  page: number,
  beersPerPage: number
): Promise<BeerInterface[]> {
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${beersPerPage}`
  );
  const data = await response.json();
  return data;
}
