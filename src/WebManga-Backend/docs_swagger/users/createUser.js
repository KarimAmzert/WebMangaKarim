module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        summary: "Création de User", // operation's desc.
        operationId: "createUser", // unique operation id.
        parameters: [], // expected params.
        requestBody:{
            required: true, // Mandatory param
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserRegister" +
                            "", // user data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            201: {
                description: "Utilisateur créer avec succes", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SuccessMessage", // User model
                        },
                    },
                },
            },
            // response code
            409: {
                description: "Utilisateur Existant", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorMessage", // User model
                        },
                    },
                },
            },
            // response code
            400: {
                description: " paramétre invalide ou données manquantes", // response desc.
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