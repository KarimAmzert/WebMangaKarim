module.exports = {
    // operation's method
    get: {
        tags: ["Users"], // operation's tag.
        security: [
            {
                bearerAuth: []
            }
        ],
        summary: "Info d'un user", // operation's desc.
        operationId: "getUser", // unique operation email
        // expected responses
        parameters: [
            {
                $ref: '#/components/parameters/userId' // data model of the param
            },
        ], // expected params.
        responses: {
            // response code
            200: {
                description: "Information de l'utilisateur ",
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserInfo", // user data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "user not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // error data model
                        },
                    },
                },
            },
            // response code
            500: {
                description: "réponse si le serveur a rencontré une situation qu'il ne sait pas gérer", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // error data model
                        },
                    },
                },
            },
        },
    },
};