const usersDb = require('../users-db').data;

async function getUser(userName, password) {
    let u = usersDb.find(e => {
        return e.userName === userName && e.password === password;
    });
    if (u) {
        let m = u.managerId ? usersDb.find(e => { return e.id === u.managerId }) : null;
        u.manageFullName = m ? `${m.firstName} ${m.lastName}` : null;
        return u;
    }
    return null;
}

module.exports = {
    getUser
}