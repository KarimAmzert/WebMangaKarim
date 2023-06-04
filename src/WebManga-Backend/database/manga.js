const { getDatabase, ref, get, child} = require("firebase/database");
const {firebaseApplication} = require("./firebaseConf");
//-------------------------------------------------------------!!Get-Mangas!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getMangas = async(req, res) => {
    const database = ref(getDatabase());
    const listesMangas = []
    get(child(database, `data/mangas`)).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            listesMangas.push({
                mangaId: childSnapshot.key,
                name: childSnapshot.val().name,
                cover: childSnapshot.val().cover,
                description: childSnapshot.val().description,
                overall: childSnapshot.val().overall,
                chapters:childSnapshot.val().chapters,
                comments:childSnapshot.val().comments,
            })
        });
        res.status(200).send(listesMangas)
    }
    else {
        console.log("No data available");}

    }).catch((error) => {
    console.error(error);
    });
}
const getManga = async(req, res) => {
    const database = ref(getDatabase());
    const mangaId = req.params.mangaId
    get(child(database, `data/mangas/${mangaId}`)).then((snapshot) => {
        if (snapshot.exists()) {
              const  manga = {
                    mangaId: snapshot.key,
                    name: snapshot.val().name,
                    cover: snapshot.val().cover,
                    description: snapshot.val().description,
                    overall: snapshot.val().overall,
                    chapters:snapshot.val().chapters,
                    comments:snapshot.val().comments,
                }
            res.status(200).send(manga)
        }
        else {
            console.log("No data available");}

    }).catch((error) => {
        console.error(error);
    });
}
//-------------------------------------------------------------!!Get- CHAPTERS!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getChapters = async(req, res) => {
    const database = ref(getDatabase());
    const mangaId = req.params.mangaId
    const listesChapters = []
    get(child(database, `data/mangas/${mangaId}/chapters`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                listesChapters.push({
                    chapterId: childSnapshot.key,
                    title: childSnapshot.val().title,
                    date: childSnapshot.val().date,
                    pages: childSnapshot.val().pages,

                })
            });
            res.status(200).send(listesChapters)
        }
        else {
            console.log("No data available");}

    }).catch((error) => {
        console.error(error);
    });
}

const getChapter = async(req, res) => {
    const database = ref(getDatabase());
    const mangaId = req.params.mangaId
    const chapterId = req.params.chapterId
    get(child(database, `data/mangas/${mangaId}/chapters/${chapterId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const chapters = {
                chapterId: snapshot.key,
                noChap:snapshot.val().noChap,
                title: snapshot.val().title,
                date: snapshot.val().date,
                pages: snapshot.val().pages

            }
            res.status(200).send(chapters)
        }
        else {
            console.log("No data available");}

    }).catch((error) => {
        console.error(error);
    });
}

//-------------------------------------------------------------!!Get-COMMENTS!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getComments = async(req, res) => {
    const database = ref(getDatabase());
    const listesComments = []
    get(child(database, `data/mangas/chapters`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                listesComments.push({
                    commentId: childSnapshot.key,
                    comment: childSnapshot.val().title,
                    date: childSnapshot.val().date,
                    username: childSnapshot.val().name,
                    note: childSnapshot.val().note,
                    userId: childSnapshot.val().userid,

                })
            });
            res.status(200).send(listesComments)
        }
        else {
            console.log("No data available");}

    }).catch((error) => {
        console.error(error);
    });
}

module.exports= {getMangas,getManga,getChapters,getChapter,getComments}