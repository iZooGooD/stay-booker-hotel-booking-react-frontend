const VerticalFiltersSkeleton = () => {
  return (
    <div
      className="border w-[240px] hidden md:block"
      data-testid="vertical-filters-skeleton"
    >
      <div className="flex justify-between items-center py-2 border-b-2  px-4">
        <div className="h-2 bg-gray-200 rounded-full mb-4 mt-1 w-20"></div>
        <span className="text-sm ml-4">
          <div className="h-2 bg-gray-200 rounded-full mb-4 mt-1 w-10"></div>
        </span>
      </div>
      <div className="border-b-2 my-2 px-2">
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
      </div>
      <div className="my-2 px-2">
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-4 px-2 my-2 mt-1 w-20"></div>
      </div>
    </div>
  );
};

export default VerticalFiltersSkeleton;
