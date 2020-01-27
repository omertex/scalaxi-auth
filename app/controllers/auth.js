const jwt = require('jsonwebtoken');
const userService = require('../services/user');

async function login(request, response) {
    const credentials = request.body;
    const user = await userService.getUser(credentials.userName, credentials.password);
    if (user) {
        let jwtClaim = {
            id: user.id,
            "https://hasura.io/jwt/claims" : {
                "x-hasura-allowed-roles": user.roles,
                "x-hasura-default-role": user.roles[0],
                "x-hasura-user-id": `${user.id}`,
                "x-hasura-user-name": `${user.userName}`,
                "x-hasura-user-fn": `${user.firstName} ${user.lastName}`,
                "x-hasura-manager-id": `${user.managerId}`,
            }
        };
        var privateKey = process.env.JWT_PRIVATE_KEY;
        var token = jwt.sign(jwtClaim, privateKey, { algorithm: 'RS256'});
        response.send({
            userId: user.id,
            accessToken: token
        });
    }
    else {
        response.status(401).send('Wrong username or password.')
    }
}

module.exports = {
    login
}