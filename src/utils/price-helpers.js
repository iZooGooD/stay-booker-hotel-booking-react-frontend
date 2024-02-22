/**
 * Formats the price with commas for every thousand.
 * @param {number} price - The price to format.
 * @returns {string} - The formatted price.
 *
 * @example
 * const formattedPrice = formatPrice(1000000); // Returns '10,00,000'
 * const formattedPrice = formatPrice(1000); // Returns '1,000'
 */
const formatPrice = (price) => {
  if (!price) return parseFloat(0).toLocaleString('en-IN');
  return parseFloat(price).toLocaleString('en-IN');
};

export { formatPrice };
