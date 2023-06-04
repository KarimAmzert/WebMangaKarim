const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,sendPasswordResetEmail,deleUser,sendEmailVerification,reauthenticate,updateEmail} = require("firebase/auth");
const { getDatabase, ref, set, get, child, remove,update } = require("firebase/database");
const {firebaseApplication} = require("./firebaseConf");

//-------------------------------------------------------------!!PATTERN!!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validate_email(email){
    const expression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return expression.test(email) ? true : false
}

function validate_password(password){
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g
    return regex.test(password) ? true : false
}


//-------------------------------------------------------------!!LOGIN!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Login = async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const auth = getAuth(firebaseApplication);
    if(email !== "" && password !== ""){
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                res.status(200).json({
                    token: user.stsTokenManager.accessToken,
                    id: user.uid,
                });
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({
                            success: false,
                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                        });
                        break;
                    case "auth/wrong-password":
                        res.status(403).json({
                            success: false,
                            message: "Le mot de passe est incorrect"
                        });
                        break;
                    default:
                        res.status(500).json({
                            success: false,
                            message: error
                        });
                }
            });

    } else
    {
        res.status(400).json({
            success:false,
            message: "Email ou mot de passe manquant"
        })
    }
}

//-------------------------------------------------------------!!SIGN-IN!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Register = async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const auth = getAuth(firebaseApplication);
    if(email !== "" && password !== ""){
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                let newDate = new Date()
                let date = newDate.getDate();
                let month = newDate.getMonth() + 1;
                let year = newDate.getFullYear();
                const user = auth.currentUser;
                const userData = {
                    userId:user.uid,
                    username:username,
                    email:email,
                    author:false,
                    createAt:user.metadata.creationTime
                }
                function writeUserDAta(data) {
                    const db = getDatabase()
                    const reference = ref(db, '/data/Users/' + data.userId)
                    set(reference,
                        data
                    )
                        .then(()=>{
                            res.status(201).send({
                                success:true,
                                message: `Utilisateur créé`,
                            })
                        })
                }
                writeUserDAta(userData)

            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/email-already-in-use":
                        res.status(409).json({
                            success: false,
                            message: "L'utilisateur existe déjà"
                        });
                        break;
                    default:
                        res.status(500).json({
                            success: false,
                            message: "Erreur lors de la création de l'utilisateur"
                        });
                }
            })
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez remplir tous les champs'
        })
    }
}

//-------------------------------------------------------------!!GET ALL USERS!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const allUsers = async(req,res) => {
    const database = ref(getDatabase());
    const listesUsers = []
    const auth = getAuth(firebaseApplication);
    get(child(database, `data/Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                listesUsers.push({
                    UserId: childSnapshot.key,
                    username: childSnapshot.val().username,
                    email: childSnapshot.val().Email,
                    creationDate: childSnapshot.val().createAt,
                    favorites: childSnapshot.val().Favorites,
                    author: childSnapshot.val().author
                })
            });
            res.status(200).send(listesUsers)
        } else{
            res.status(404).send({
                success: false,
                message: "l'utilisateur n'existe pas",
            });
        }
    }).catch((error) => {
        res.status(500).send({
            success: false,
            message: error,
        });
    });
}
//-------------------------------------------------------------!!GET USER!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getUser = async(req, res) => {
    const database = ref(getDatabase());
    const userId = req.params.userId
    get(child(database, `data/Users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const user = {
                UserId: snapshot.key,
                username: snapshot.val().username,
                email: snapshot.val().Email,
                creationDate: snapshot.val().createAt,
                favorites: snapshot.val().Favorites,
                author: snapshot.val().author

            }
            res.status(200).send(user)
        }
        else {
            console.log("No data available");}

    }).catch((error) => {
        console.error(error);
    });
}

//-------------------------------------------------------------!!FORGET PASSWORD!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const resetPassword = async(req,res) =>{
    const auth = getAuth(firebaseApplication);
    const email = req.body.email

    if(email !== ""){
        sendPasswordResetEmail(auth, email)
            .then(()=>{
                // Password reset email sent!
                res.status(201).send({
                    success:true,
                    message: `un message de vérification est envoyé veuillez cliquez pour modifié  le Mot de passe `,
                });
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/invalid-email":
                        res.status(400).json({
                            success: false,
                            message: "Email non valide"
                        });
                        break;
                    case "auth/user-not-found":
                        res.status(404).json({
                            success: false,
                            message: "Veuillez verifier votre email"
                        });
                        break;
                    default:
                        res.status(500).json({
                            success: false,
                            message: error
                        });
                }
            })
    }
    else{
        res.status(400).send({
            success:false,
            message:'Veuillez remplir tous les champs'
        })
    }
}
//-------------------------------------------------------------!!UPDATE PROFILE!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const updateUser = async(req,res) =>{

    const db = getDatabase();
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;

    const username = req.body.username
    const author = req.body.author
    const email = req.body.email

    // mettre à jour les données de l'utilisateur
    if(user !== null){
        console.log(user.uid)
        if(username !== "" && author !==""&&validate_email(email)){
            const user_data =  {
                username :username,
                author: author,
                email:email
            }
            const reference = ref(db,'data/Users/' + user.uid)
            await update(reference, user_data)
            await updateEmail(user, email)
                .then(() => {
                    res.status(201).send({
                        success:true,
                        message: `Utilisateur modifié`,
                    })
                })
                .catch(() => {
                    res.status(500).json({
                        success: false,
                        message: "Erreur lors de la mis à jour de l'utilisateur"
                    });

                })
        }
        else{
            res.status(400).send({
                success:false,
                message:'veuillez vérifier ou remplier les champs nécessaires'
            })
        }
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }

}

//-------------------------------------------------------------!!DELETE ACCOUNT!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const deleteOneUser = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;
    if(user !== null){
        await remove(child(database, `users/${user.uid}`), null)
            .then(()=>{
                deleUser(user)
                res.status(201).send({
                    success:true,
                    message: `User delete`,
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({
                            success: false,
                            message: "User not found"
                        });
                        break;
                    default:
                        res.status(500).json({
                            success: false,
                            message: "erreur lors de la supression de l'utilisateur"
                        });
                }
            });
    } else{
        res.status(401).send({
            message: 'User not connected',
        });
    }
}
//-------------------------------------------------------------!!USER VALIDATE AUTHOR!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const validate = async (req, res) => {
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser
    if (user !== null && !user.emailVerified) {
        sendEmailVerification(user).then(() => {
            res.status(200).send({
                success: true,
                message: `Un courriel de vérification a été envoyé à l'email ${user}`,
            });
        }).catch((error) => {
            res.status(500).send({
                message: error,
            });
        });
    } else {
        auth.signOut()
    }

}
//-------------------------------------------------------------!!USER FAVORITES!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const addFavoris = async(req,res) =>{

    const db = getDatabase();
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;

    const favoris = req.body.mangaId
    mangaId= { mangaId : favoris}
    // mettre à jour les données de l'utilisateur
    if(user !== null){
        console.log(user)
        const reference = ref(db,'data/Users/' + user.uid + '/favoris/'+ favoris)
        await update(reference, mangaId)
            .then(() => {
                res.status(201).send({
                    success:true,
                    message: `favoris ajouté`,
                })
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    message: "Erreur lors de l'ajout d'un favoris"
                });
            })
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }

}

const getFavoris = async(req,res) =>{
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;
    const database = ref(getDatabase())

    const listFavorisId = []
    let mangasFavoris = []

    if(user !== null){
        let data = await get(child(database, `data/Users/`+ user.uid  +'/favoris'))
        data.forEach((snapshot) => {
            listFavorisId.push(
                snapshot.key,
            )
        });

        for (const mangaId of listFavorisId) {
            mangasFavoris.push(await get(child(database, `data/mangas/${mangaId}`)).then((snapshot) => {
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
                    return manga
                }
                else {
                    console.log("No data available");}

            }).catch((error) => {
                console.error(error);
            })
            );
        }
        res.status(200).send(mangasFavoris)

    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }

}
const deleteFavoris = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;
    const mangaId = req.body.mangaId

    if(user !== null){
        await remove(child(database, `data/Users/`+ user.uid  +'/favoris/'+ mangaId), null)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `Manga a été supprimé des favoris de l'utilisateur`,
                })
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    message: "erreur lors de la supression de l'utilisateur"
                });
            });
    } else{
        res.status(401).send({
            message: 'User not connected',
        });
    }
}
const isFavoris = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(firebaseApplication);
    const user = auth.currentUser;
    const mangaId = req.params.mangaId

    if(user !== null){
        await get(child(database, `data/Users/`+ user.uid  +'/favoris/'+ mangaId))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    res.status(200).json({isFavoris : true})
                }
                else {
                    res.status(200).json({isFavoris : false})
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return errors = {
                    success: false,
                    message: errorMessage,
                    code: errorCode
                }

            })
    } else{
        res.status(401).send({
            message: 'User not connected',
        });
    }
}

//-------------------------------------------------------------!!EXPORT!!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
    Register,
    Login,
    getUser,
    allUsers,
    resetPassword,
    deleteOneUser,
    validate,
    updateUser,
    addFavoris,
    getFavoris,
    deleteFavoris,
    isFavoris

}
