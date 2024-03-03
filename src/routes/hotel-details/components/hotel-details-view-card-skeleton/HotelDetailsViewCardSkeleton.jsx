const HotelDetailsViewCardSkeleton = () => {
  return (
    <div className="flex items-start justify-center flex-wrap container mx-auto p-4 animate-pulse">
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <svg width="608" height="288" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="100%" height="100%" fill="#e0e0e0" />
          </svg>
        </div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded-full w-40 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full w-60 mb-4"></div>
          <div className="mt-2 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gray-200 rounded-full w-full mb-4"
              ></div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="h-2 bg-gray-200 rounded-full w-40 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelDetailsViewCardSkeleton;
