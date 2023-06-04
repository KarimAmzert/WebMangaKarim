module.exports = {
    // operation's method
    get: {
        tags: ["Mangas"], // operation's tag.
        summary: "liste de mangas", // operation's desc.
        operationId: "getAllMangas", // unique operation email
        // expected responses
        responses: {
            // response code
            200: {
                description: "les données des  sont retournées", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Manga", // user data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "réponse si aucun Manga n'est trouvé", // response desc.
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
                description: "serveur erreur", // response desc.
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