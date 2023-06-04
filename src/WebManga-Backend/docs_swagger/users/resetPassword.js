module.exports = {
    // method of operation
    post: {
        tags: ["Users"], // operation's tag.
        parameters: [], // expected params.
        summary: "Mot de passe oublié", // operation's desc.
        operationId: "resetPassword", // unique operation id.
        // expected responses
        requestBody:{
            required: true, // Mandatory param
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userEmail"
                    },
                },
            },
        },
        responses: {
            // response code
            201: {
                description: "Mot de passe réinitialisé avec succès", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SuccessMessage", // user data model
                        },
                    },
                },
            },
            // response code
            401: {
                description: "Utilisateur non connecté", // response desc.
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
            400: {
                description: "Veuillez compléter votre email", // response desc.
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
            404: {
                description: "Email not found", // response desc.
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
                description: "Erreur Serveur", // response desc.
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