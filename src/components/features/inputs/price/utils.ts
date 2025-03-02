export const handleDecimalInput = (value: string): string => {
  // allow only numbers and a single decimal point
  const sanitized = value
    .replace(/[^\d.]/g, "")
    // remove extra decimal points after the first one
    .replace(/(\..*)\./g, "$1");

  return sanitized;
};
