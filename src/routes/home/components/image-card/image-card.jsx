const ImageCard = (props) => {
  const { name, imageUrl } = props;
  return (
    <div className="p-4 border">
      <img src={imageUrl} className="rounded w-[120px] h-[75px]" alt="mumbai" />
      <h4 className="text-center">{name}</h4>
    </div>
  );
};
export default ImageCard;
