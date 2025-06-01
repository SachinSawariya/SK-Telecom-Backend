const LOGIN = {
    SUCCESS: 0,
    PASSWORD_WRONG: 1,
    ACCOUNT_NOT_FOUND: 2,
};

const JWT = {
    SECRET: "myjwtadminsecret",
    EXPIRES_IN: "24h",
    REFRESH_EXPIRES_IN: "30d",
    CLIENT_EXPIRES_IN: "30d",
  
    CHANGE_PASSWORD_SUCCESS: 1,
    PASSWORD_USE_ERROR: 2,
    PASSWORD_NOT_MATCH: 0,
};

module.exports = {
    LOGIN,
    JWT
}