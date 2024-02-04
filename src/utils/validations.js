// Define an object for storing validation rules
const validations = {
  // Define validation rules for specific fields
  fields: {
    email: {
      required: true, // Specify if the field is required
      // Use a regular expression to define the pattern for a valid email address
      pattern: /^[^\s-]\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}[^\s-]$/i,
    },
  },

  // Define a function for validating a specific field with a given value
  validate(field, value) {
    // Check if the specified field has validation rules defined
    return this.fields[field] ? this.fields[field].pattern.test(value) : false;
  },
};

// Export the validations object for use in other modules
export default validations;
