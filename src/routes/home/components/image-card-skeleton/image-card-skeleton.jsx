const ImageCardSkeleton = () => {
  return (
    <div className="p-4 border">
      <svg
        className="rounded w-[120px] h-[75px] text-gray-200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="#e0e0e0" />
      </svg>
      <div className="h-2 bg-gray-200 rounded-full mb-4 mt-1"></div>
    </div>
  );
};
export default ImageCardSkeleton;
