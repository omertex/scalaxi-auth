let tempUsers = [
    { id: 100001, userName: "dkhanevich", firstName: "Dmitry", lastName: "Khanevich", roles:["manager"], password: "123" },
    { id: 100002, userName: "avanushin", firstName: "Andrey", lastName: "Vanushin", roles:["developer"], password: "123" },
];

async function getUser(userName, password) {
    return tempUsers.find(e => {
        return e.userName === userName && e.password === password;
    })
}

module.exports = {
    getUser
}