import SbCheckbox from '../sb-checkbox/sb-checkbox';
const VerticalFilters = (props) => {
  const { filtersData, onFiltersUpdate } = props;

  console.log('filtersData', filtersData);

  return (
    <div className="hotels-filters__container border w-[240px]">
      <div className="hotels-filters__header flex justify-between items-center py-2 border-b-2  px-4">
        <h4 className="text-base font-bold text-slate-600 uppercase">
          Filters
        </h4>
        <span className="text-sm ml-4">Clear</span>
      </div>
      {filtersData.map((filter) => (
        <div className="border-b-2">
          <h4 className="text-base font-bold text-slate-600 my-1 px-2">
            {filter.title}
          </h4>
          {filter.filters.map((subfilter) => (
            <SbCheckbox
              id={subfilter.id}
              label={subfilter.title}
              isSelected={subfilter.isSelected}
              filterId={filter.filterId}
              onFiltersUpdate={onFiltersUpdate}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VerticalFilters;
