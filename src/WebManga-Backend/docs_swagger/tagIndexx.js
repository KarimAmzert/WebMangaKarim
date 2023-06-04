const createUser = require('./users/createUser');
const loginUser = require('./users/loginUser');
const getAllUser = require('./users/allUsers');
const getAllManga = require('./mangas/getAllMangas');
const getManga = require('./mangas/getManga');
const getUser = require("./users/getUser");
const resetPassWord = require("./users/resetPassword")
const deleteOneUser = require("./users/deleteUser");



module.exports = {
    paths:{
        '/auth/register':{
            ...createUser,
        },
        '/auth/login':{
            ...loginUser,
        },
        '/getAllUsers':{
            ...getAllUser,
        },
        '/getUser/{userId}':{
        ...getUser,
        },
        '/auth/resetPassword':{
        ...resetPassWord,
        },
        '/auth/deleteUser':{
            ...deleteOneUser,
        },
        '/mangas':{
            ...getAllManga,
        },
        '/mangas/{mangaId}':{
            ...getManga,
        }

    }
}