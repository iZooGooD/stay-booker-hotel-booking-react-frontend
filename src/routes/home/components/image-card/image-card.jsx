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
