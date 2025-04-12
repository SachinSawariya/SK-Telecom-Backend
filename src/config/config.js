module.exports = {
    server : {
        port : process.env.PORT || 4000,
        DB_URI : process.env.MONGODB_URI,
        DB_NAME : process.env.DB_NAME || shopData,
    },

    PORT : process.env.PORT ?? "4000" ,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
}