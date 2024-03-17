const EmptyHotelsState = () => (
  <div className="text-center my-10 min-h-96">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-12 h-12 mx-auto text-gray-600 mb-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.172 20c.818 0 1.544-.312 2.121-.88l6.343-6.344a3 3 0 10-4.243-4.243L7.05 14.88a3 3 0 000 4.243 2.99 2.99 0 002.121.877v0zM13 7h7m0 0v7m0-7l-8 8"
      />
    </svg>
    <h3 className="text-lg text-gray-800 font-semibold">No Hotels Found</h3>
    <p className="text-gray-500">
      We can't seem to find any hotels that match your search criteria.
    </p>
  </div>
);

export default EmptyHotelsState;
