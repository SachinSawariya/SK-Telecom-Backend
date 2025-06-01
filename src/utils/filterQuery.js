const getFilterQuery = async (query) => {
  if (query.search && query.search.trim() !== "") {
    query["$or"] = query.searchColumns?.map((column) => ({
      [column]: {
        $regex: query.search.replace(/[-[\]{}()*+?.,\\/^$|#]/g, "\\$&").trim(),
        $options: "i", // Case-insensitive search
      },
    }));
  }

  delete query.search;
  delete query.searchColumns;

  return query;
};

module.exports = {
  getFilterQuery,
};
