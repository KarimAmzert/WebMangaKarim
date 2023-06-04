module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        summary: "Obtenir un jeton d'authentification", // operation's desc.
        operationId: "loginUser", // unique operation id.
        parameters: [], // expected params.
        requestBody:  {
            required: true, // Mandatory param
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserLogin", // user data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Le jeton", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TokenCreationResponse", // user data model
                        },
                    },
                },
            },
            // response code
            403: {
                description: "Mot de passe Incorrect", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // user data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "User Not Found", // response desc.
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
            400: {
                description: " paramétre  invalide ou  données manquantes", // response desc.
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
                description: "Serveur Erreur", // response desc.
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