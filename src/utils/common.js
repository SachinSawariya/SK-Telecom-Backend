const convertPaginationResults = (data, pagination, filterCount) => {
  try {
    data = data[0];
    let totalDocs = data.metadata[0] ? data.metadata[0].total : 0;
    let docs = data.docs;
    let limit = pagination.limit;
    let totalPages = Math.ceil(totalDocs / limit) === 0 ? 1 : Math.ceil(totalDocs / limit);
    let page = Math.ceil(pagination.offset / limit) === 0 ? 1 : Math.ceil(pagination.offset / limit) + 1;
    let hasPrevPage = false;
    let prevPage = null;
    let nextPage = null;
    if (page !== 1 && page !== 0) {
      hasPrevPage = true;
      prevPage = page - 1;
    }
    let hasNextPage = false;
    if (page !== totalPages) {
      hasNextPage = true;
      nextPage = page + 1;
    }
    let responseData = {
      docs: docs,
      totalDocs: totalDocs,
      offset: pagination.offset,
      limit: limit,
      totalPages: totalPages,
      page: page,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevPage: prevPage,
      nextPage: nextPage,
      filterCount: filterCount || 0,
    };
    return responseData;
  } catch (error) {
    logger.error("Error - convertPaginationResult", error);
    throw error;
  }
};

module.exports = {
  convertPaginationResults,
}