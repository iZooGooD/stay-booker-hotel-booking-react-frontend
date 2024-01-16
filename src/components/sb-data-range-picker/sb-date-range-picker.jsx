import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { formatDate } from '../../utils/date-helpers';

const SbDateRangePicker = (props) => {
  const { isDatePickerVisible, onDatePickerIconClick, onDateSelect } = props;
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const onDateRangeChange = (item) => {
    onDateSelect(item.selection);
    setState([item.selection]);
  };
  // Format dates for display
  const formattedStartDate = state[0].startDate
    ? formatDate(state[0].startDate)
    : 'Check-in';
  const formattedEndDate = state[0].endDate
    ? formatDate(state[0].endDate)
    : 'Check-out';

  return (
    <div className="relative flex">
      <input
        className="stay-booker__input px-8 py-2 w-[50%]"
        type="text"
        value={formattedStartDate}
        onFocus={onDatePickerIconClick}
        readOnly
      ></input>
      <FontAwesomeIcon
        icon={faCalendar}
        color="#074498"
        className="left-[4%] md:left-[4%] transform-center-y"
        onClick={onDatePickerIconClick}
      />
      <input
        className="stay-booker__input px-8 py-2 w-[50%]"
        type="text"
        value={formattedEndDate}
        onFocus={onDatePickerIconClick}
        readOnly
      ></input>
      {isDatePickerVisible && (
        <DateRange
          editableDateInputs={true}
          onChange={onDateRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
          direction="horizontal"
          className="sb__date-range-picker"
        />
      )}
    </div>
  );
};

export default SbDateRangePicker;
