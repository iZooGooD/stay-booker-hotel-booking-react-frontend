import { parse, format } from 'date-fns';

/**
 * Formats a JavaScript Date object into a string with the format "DD/MM/YYYY".
 *
 * @param date - The Date object to format.
 * @returns A string representing the formatted date.
 * @example formatDate(new Date('2022-01-01')) // "01/01/2022"
 */
function formatDate(date) {
  // Check if the date is undefined or not a valid Date object
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return;
  }
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  day = day.length < 2 ? `0${day}` : day;
  month = month.length < 2 ? `0${month}` : month;
  return `${day}/${month}/${year}`;
}

/**
 * Formats a date string in the format "DD-MM-YYYY" into a more readable format.
 *
 * @param dateString - The date string to format.
 * @returns A string representing the formatted date.
 * @example getReadableMonthFormat('01-01-2022') // "1 January 2022"
 */
function getReadableMonthFormat(dateString) {
  if (!dateString) {
    return '';
  }
  return format(parse(dateString, 'dd-MM-yyyy', new Date()), 'd MMMM yyyy');
}

export { formatDate, getReadableMonthFormat };
