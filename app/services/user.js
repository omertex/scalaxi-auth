const usersDb = require('../users-db').data;

async function getUser(userName, password) {
    return usersDb.find(e => {
        return e.userName === userName && e.password === password;
    })
}

module.exports = {
    getUser
}