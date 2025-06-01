const {getFilterQuery} = require('./filterQuery')

const getAllDocuments = async (model, query, options) => {

  query = await getFilterQuery(query);
  return new Promise((resolve, reject) => {
    model.paginate(query, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


module.exports = {
  getAllDocuments
}