/**
 * Formats a JavaScript Date object into a string with the format "DD/MM/YYYY".
 *
 * @param date - The Date object to format.
 * @returns A string representing the formatted date.
 * @throws {Error} If the input is not a valid Date object or is undefined.
 */
function formatDate(date) {
  // Check if the date is undefined or not a valid Date object
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid input: Expected a valid Date object');
  }
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  day = day.length < 2 ? `0${day}` : day;
  month = month.length < 2 ? `0${month}` : month;
  return `${day}/${month}/${year}`;
}

export { formatDate };
