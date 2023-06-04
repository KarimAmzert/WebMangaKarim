const express = require('express');
const router = express.Router();

const {
    getMangas,getManga,getChapters,getChapter
} = require('../../database/manga')

//-------------------------------------------------------------!! ROUTE MANGA !!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get("/mangas",getMangas)
router.get("/mangas/:mangaId",getManga)
router.get("/mangas/:mangaId/chapters",getChapters)
router.get("/mangas/:mangaId/chapters/:chapterId",getChapter)

module.exports = router
