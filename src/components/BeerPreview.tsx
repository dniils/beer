import BeerInterface from '../types/BeerInterface';
import '../styles/BeerPreview.scss';
import noImageImage from '../assets/images/no-image-for-this-beer.png';

type BeerPreviewProp = Pick<
  BeerInterface,
  'id' | 'name' | 'description' | 'image_url'
>;

function makeTextShorter(s: string): string {
  if (s.length > 900) {
    return `${s.slice(0, 900)}...`;
  }
  return s;
}

function BeerPreview({ beer }: { beer: BeerPreviewProp }) {
  return (
    <div className="beer-preview">
      <img
        src={beer.image_url ? beer.image_url : noImageImage}
        alt="beer-img"
        className="beer-preview__image"
      />
      <div className="beer-preview__content-and-button">
        <div className="beer-preview__content">
          <h2 className="beer-preview__title">{beer.name}</h2>
          <div className="beer-preview__description">
            {makeTextShorter(beer.description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeerPreview;
