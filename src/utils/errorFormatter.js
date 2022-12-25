module.exports.errorFormatter = (e) => {
  let errors = {};
  const allErrors = e.substring(e.indexOf(":") + 1).trim();
  const allErrorsInArrayFormat = allErrors.split(",").map((err) => err.trim());
 
  allErrorsInArrayFormat.forEach((err) => {
    const [key, value] = err.split(":").map((err) => err.trim());
    errors[key] = value;
  });
 
  return errors;
};
