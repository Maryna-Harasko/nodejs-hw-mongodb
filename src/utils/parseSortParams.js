const parseSortOrder = (sortOrder) => {
  const isKnownOrder = ["asc", "desc"].includes(sortOrder);
  if(isKnownOrder) return sortOrder;
  return "asc";
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    "_id",
    "name",
    "phoneNumber",
    "email"
  ];

  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = ({sortOrder, sortBy}) => {
  return {
    sortOrder: parseSortOrder(sortOrder, 'asc'), 
    sortBy: parseSortBy(sortBy, 'name'),
  };
};