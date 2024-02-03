import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { formatDate } from 'utils/date-helpers';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';

const SbDateRangePicker = (props) => {
  const {
    isDatePickerVisible,
    onDatePickerIconClick,
    onDateChangeHandler,
    dateRange,
    setisDatePickerVisible,
  } = props;

  const wrapperRef = useRef();
  useOutsideClickHandler(wrapperRef, () => setisDatePickerVisible(false));

  // Format dates for display
  const formattedStartDate = dateRange[0].startDate
    ? formatDate(dateRange[0].startDate)
    : 'Check-in';
  const formattedEndDate = dateRange[0].endDate
    ? formatDate(dateRange[0].endDate)
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
      <div ref={wrapperRef} className="">
        {isDatePickerVisible && (
          <DateRange
            editableDateInputs={true}
            onChange={onDateChangeHandler}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            direction="horizontal"
            className="sb__date-range-picker"
          />
        )}
      </div>
    </div>
  );
};

export default SbDateRangePicker;
