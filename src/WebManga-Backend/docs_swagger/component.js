module.exports = {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        parameters: {
            mangaId: {
                name: "mangaId", // name of the param
                type: "parameter", // type of the object
                description: "Id du Manga", // param desc.
                in: "path", // location of the param
                schema: {
                    type: "string", // data type
                    example: "OTKspTlN2nVRtXyh7tEjqyC49YX2", // example of the data
                },
            },
            userId: {
                name: "userId", // name of the param
                type: "parameter", // type of the object
                description: "Id de l'utilisateur", // param desc.
                in: "path", // location of the param
                schema: {
                    type: "string", // data type
                    example: "zknjZZopzceQ3zq8jhgRbQLxe282", // example of the data
                },
            },
        },
        schemas: {
            //  Inscription modèle
            UserRegister: {
                type: "object", // type of the object
                required: ["email", "password","username"],
                properties: {
                    email: {
                        type: "string",
                    },
                    username: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
                example: {
                    email: "e2008040@cmaisonneuve.qc.ca",
                    username:"camillo",
                    password: "e2008040",
                },
            },
            //  Connexion modèle
            UserLogin: {
                type: "object", // type of the object
                required: ["email", "password"],

                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
                example: {
                    email: "e2008040@cmaisonneuve.qc.ca",
                    password: "e2008040",
                },
            },
            //  info user
            UserInfo: {
                type: "object", // type of the object
                required: [],
                properties: {
                    email: {
                        type: "string",
                    },
                    UserId: {
                        type: "string",
                    },
                    username: {
                        type: "string",
                    },
                    creationDate: {
                        type: "string",
                    },
                    favorites: {
                        type: {},
                    },
                    author: {
                        type: "string",
                    },
                },
                example: {
                    Email: "user@email.com",
                    Favorites: [
                        "OTKspTlN2nVRtXyh7tEjqyC49YX2",
                        "mangaid2"
                    ],
                    Userid: "userid",
                    Username: "username",
                    creationdate: "01-01-2023",
                    author:false
                },
            },
            userEmail: {
                type: "object", // type of the object
                required: ["email"],
                properties: {
                    email: {
                        type: "string",
                    },
                },
                example: {
                    email: "e2008040@cmaisonneuve.qc.ca",}
            },
            // message de succès
            SuccessMessage: {
                type: "object",
                required: ["message"],
                properties: {
                    message: {
                        type: "string", // data-type
                    },
                    success: {
                        type: "boolean", // data-type
                    },
                },
                example: {
                    message: "Un message d'erreur descriptif",
                    success: true,
                },
            },
            ErrorMessage: {
                type: "object",
                required: ["message"],
                properties: {
                    message: {
                        type: "string", // data-type
                    },
                    success: {
                        type: "boolean", // data-type
                    },
                },
                example: {
                    message: "Un message d'erreur descriptif",
                    success: false,
                },
            },
            //  token modèle
            TokenCreationResponse: {
                type: "object", // type of the object
                required: ["token"],
                properties: {
                    token: {
                        type: "string",
                    },
                },
                example: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWUiOiJNYXJpZSBDdXJpZSIsImVtYWlsIjoibWFjdXJpZUBzY2llbmNlLmNvbSIsImlhdCI6MTYxOTIyNjkxNn0.Nn0SP4ZzW4jaOu_Q47Cq-NPm545zfxJmY7ww7GWyJL0"
                },
            },
            Manga: {
                type: "object", // data-type
                required: ["mangaId", "name", "cover", "description", "overall","chapters","comments"], // required fields
                properties: {
                    mangaId: {
                        type: "string", // data-type
                    },
                    name: {
                        type: "string", // data-type
                    },
                    cover: {
                        type: "string", // data-type
                    },
                    description: {
                        type: "string", // data-type
                    },
                    chapters: {
                        type: "list", // data-type
                    },
                    comments: {
                        type: "objet", // data-type
                    },
                    overall: {
                        type: "int", // data-type
                    },
                },
                required: ["mangaId", "name", "cover", "description", "overall","chapters","comments"], // required fields
                example: {
                    mangaId: "MNVavGIM9gVNrXyh7tVjqyQ4CYP2",
                    name: "Solo Levelling",
                    description: "blablablablalba",
                    cover: "https://firebasestorage.googleapis.com/v0/b/webmanga-fdfc2.appspot.com/o/mangas%2FOTKspTlN2nVRtXyh7tEjqyC49YX2%2Fcover.jpg?alt=media&token=3a257e0d-2d1a-4c88-b6dd-b80f17c39c10",
                    overall:10,
                    chapters:[],
                    comments:[]
                },
            },


        },
    },
};
