import React from 'react';

/**
 * ImageCard
 * Renders an image card with a name and image.
 * @param {Object} props - The component props.
 * @param {String} props.name - The name of the destination.
 * @param {String} props.imageUrl - The image url of the destination.
 * @param {Function} props.onPopularDestincationCardClick - The click handler for the card.
 * @returns {JSX.Element} - The ImageCard component.
 */
const ImageCard = (props) => {
  const { name, imageUrl, onPopularDestincationCardClick } = props;
  return (
    <div
      className="p-4 border hover:bg-slate-100 cursor-pointer"
      onClick={() => onPopularDestincationCardClick(name)}
      data-testid="image-card"
    >
      <img src={imageUrl} className="rounded w-[120px] h-[75px]" alt="mumbai" />
      <h4 className="text-center">{name}</h4>
    </div>
  );
};
export default ImageCard;
