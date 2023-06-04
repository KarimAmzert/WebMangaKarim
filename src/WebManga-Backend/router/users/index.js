const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    Login,
    Register,
    allUsers,
    getUser,
    resetPassword,
    deleteOneUser,
    updateUser,
    addFavoris,
    getFavoris,
    deleteFavoris,
    isFavoris

} = require('../../database/user.js')



//-------------------------------------------------------------!! ROUTE USER !!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/auth/login",Login)
router.post("/auth/register",Register)
router.post("/auth/resetPassword",resetPassword)
router.post("/auth/updateUser",updateUser)
router.post("/auth/deleteUser",deleteOneUser)
router.get("/getAllUsers",allUsers)
router.get("/getUser/:userId",getUser)
router.post("/favorite",addFavoris)
router.get("/favorites",getFavoris)
router.get("/favorite/:mangaId",isFavoris)
router.delete("/favorite",deleteFavoris)



module.exports = router
