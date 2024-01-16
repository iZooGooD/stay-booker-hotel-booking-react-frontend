import ImageCard from '../image-card/image-card';
const PopularLocations = (props) => {
  const { popularDestinationsData } = props;
  return (
    <div className="my-4">
      <h2 className="text-3xl font-medium text-slate-700 text-center">
        Book Hotels at Popular Destinations
      </h2>
      <div className="flex my-4 gap-x-8 gap-y-4 justify-center flex-wrap">
        {popularDestinationsData.map((data) => (
          <ImageCard
            key={data.code}
            name={data.name}
            imageUrl={data.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
export default PopularLocations;
