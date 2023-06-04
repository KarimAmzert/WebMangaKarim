module.exports = {
    // operation's method
    get: {
        tags: ["Mangas"], // operation's tag.
        summary: "Un Manga", // operation's desc.
        operationId: "getManga",
        parameters: [
            {
                $ref: '#/components/parameters/mangaId' // data model of the param
            },
        ],
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