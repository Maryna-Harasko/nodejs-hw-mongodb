const parseInt = (number, defaultNumber) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultNumber;

  const parsedNumber = Number.parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultNumber;
  }

  return parsedNumber;
};

export const parsePaginationParams = ({page, perPage}) => {
  return {
    page: parseInt(page, 1), 
    perPage: parseInt(perPage, 10),
  };

};