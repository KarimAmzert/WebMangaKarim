module.exports = {
    // operation's method
    get: {
        tags: ["Users"], // operation's tag.
        summary: "Liste de tous les utilisateurs", // operation's desc.
        operationId: "getAllUser", // unique operation email
        // expected responses
        parameters: [ ], // expected params.
        responses: {
            // response code
            200: {
                description: "Retourne tous les utilisateurs", // response desc.
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
                description: "aucun utilisateur ", // response desc.
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
                description: "Erreur serveur", // response desc.
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