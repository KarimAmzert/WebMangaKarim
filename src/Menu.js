import {useNavigate} from "react-router-dom";
import {React, useContext, useState, useEffect} from "react";
import {regexPasswordCarac, regexPasswordMaj,regexPasswordMin,regexPasswordTaille,auth} from "./Constantes.js";
import {signOut} from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import {TokenContexte} from "./ContextToken";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IdContexte } from "./ContextId.js";

export function Menu() {
    const [userEmail, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userConfirmPassword, setuserConfirmPassword] = useState("");
    const [errormessagecheck, setcheck] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [signupsuccess, setsignupsuccess] = useState(false);
    const [successMessage, setsuccessMessage] = useState("");
    const [signuporlogin, setsignuporlogin] = useState(true);
    const [mangas, setMangas] = useState([]);
    const [author, setauthor] = useState("false");
    const [open, setOpen] = useState(false);
    const contextToken = useContext(TokenContexte);
    const contextId = useContext(IdContexte);
    const token = sessionStorage.getItem("token");
    const isauthor = sessionStorage.getItem("isauthor");
    const [id, setid] = useState("");
    const navigate = useNavigate();
    const userCredentials = {
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
        username: username
        };

    function handleChangeSignup(){
        setsignuporlogin(false);
        setcheck(false);
        setsignupsuccess(false);
        setEmail("");
        setPassword("");
        setuserConfirmPassword("");
        setUsername("");
    }
    function handleChangeLogin(){
        setsignuporlogin(true);
        setcheck(false);
        setEmail("");
        setPassword("");
    }
    const handleInputChange = (event, value) => {
        if (value !== '') {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    function handleMangaSelection(selectedMangaId) {
        
        
        if (selectedMangaId) {
          window.location.href= ("/mangas/" + selectedMangaId)
        }
      }
    function openModal() {
        document.getElementById("modal1").classList.add("is-active");
      }
      function closeModal() {
        document.getElementById("modal1").classList.remove("is-active");
      }
      
      async function login() {
        const urlAuth = `http://localhost:4000/auth/login`;
        const resUrlAuth = await fetch(urlAuth,{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },body:JSON.stringify(userCredentials)
        });

        if (resUrlAuth.ok) {
            const database = ref(getDatabase());
            const data = await resUrlAuth.json();
            console.log(data);
             await setid(data.id);
               await get(child(database, `data/Users/` + id + `/author`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setauthor( snapshot.val());
                    }
                })
           
            closeModal();
            navigate("/");
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.id);
            sessionStorage.setItem("isauthor", author);
            console.log(sessionStorage.getItem("isauthor"));
            contextToken.setToken(sessionStorage.getItem("token"));
            contextId.setId(sessionStorage.getItem("id"));
        } else {
            const data = await resUrlAuth.json();
            console.log(data.message);
            setcheck(true);
            setErrorMessage(data.message);
            console.log("une erreur s'est productive lors de l'appel à /Login");
        }
    }
    
    async function signUp() {
        const urlRegister = `http://localhost:4000/auth/register`;
        const resUrlRegister = await fetch(urlRegister, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            }, body: JSON.stringify(userCredentials)
        });
        if (resUrlRegister.ok) {
            const data = await resUrlRegister.json();
            console.log(data);
            navigate("/");
            handleChangeLogin();
            openModal();
            setsignupsuccess(true);
            setsuccessMessage("Your account has been created. Please Login")
        } else {
            const data = await resUrlRegister.json();
            setErrorMessage(data.message);
            setcheck(true);
        }
    }
    async function logout(){
        const user = await signOut(auth);
        try {
            console.log('Successfully signed out');
            console.log(user);
            navigate("/");
            sessionStorage.removeItem('token');
            sessionStorage.removeItem("isauthor");
            sessionStorage.removeItem("id");
            contextToken.token = "";
            contextId.Id = "";
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getMangas() {
            // obtenir les mangas
            const urlManga = `http://localhost:4000/Mangas`;
        const resultatManga = await fetch(urlManga,{
            method:"GET",
            headers:{
                "content-Type":"application/json; charset=UTF-8"
            }
        });

        if (resultatManga.ok) {
            const data = await resultatManga.json();
            setMangas(data);
        } else {
            console.log("une erreur s'est productive lors de l'appel à /Manga");
        }
    }

        getMangas().then(() => console.log("done getMangas"));
    }, []);

          
    return (
        <>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1>
                            <b>Karim Amzert</b>
                        </h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                        { token !== null &&
                        <a className="navbar-item" href="/favoris">
                            Favorites
                        </a>
                        }
                        <a className="navbar-item">
                            Trending
                        </a>
                        
                        { isauthor === "true" &&
                        <a className="navbar-item" href="/upload">
                            Upload
                        </a>
                        }
                        { token !== null &&
                        <a className="navbar-item" href={'/profile/' + sessionStorage.getItem("id")}>
                            Profile
                        </a>
                        }
                        { isauthor === "false" &&
                        <a className="navbar-item">
                            Apply to become an author!
                        </a>
                        }
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                                <div className="control">
                                    <Autocomplete
                                        style={{ width: 500, backgroundColor: "white", borderRadius: 10 }}
                                        freeSolo
                                        autoComplete
                                        autoHighlight
                                        open={open}
                                        options={Object.values(mangas)}
                                        getOptionSelected={(option, value) => option.mangaId === value.mangaId}
                                        getOptionLabel={(option) => option.name}
                                        onInputChange={handleInputChange}
                                        onChange={(event, value) => handleMangaSelection(value ? value.mangaId : null)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Search Manga"
                                            />
                                        )}
                                        renderOption={(option) => (
                                            <div
                                                onClick={() => handleMangaSelection(option.mangaId)}
                                            >
                                            <img src={option.cover}width="40" height="50" alt={option.cover}></img>
                                            <div className="is-centered">{option.name}</div>
                                            </div>
                                        )}
                                    />
                                </div>
                            &nbsp;
                            { token === null &&
                                <a className="navbar-item" onClick={openModal}>
                                   Login
                                </a>
                                }
                                  { token !== null &&
                                <a className="navbar-item" onClick={logout}>
                                   Sign out
                                </a>
                                }
                            <div className="buttons">

                                <div className="modal" id="modal1">
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                    <header className="modal-card-head">
                                        <img src="/images/apple-touch-icon@2.png" alt="logo"/>
                                            &nbsp;
                                    <h1 className="modal-card-title">
                                        <b>WebManga</b>
                                    </h1>
                                        <button className="delete"
                                            aria-label="close"onClick={closeModal}>
                                        </button>
                                    </header>
                                    { signupsuccess &&
                                    <div class="box has-text-primary is-outlined">
                                        <span class="icon has-text-success">
                                            <i class="fas fa-check-square"></i>
                                        </span>
                                        { successMessage };
                                    </div>
                                      }
                                    { errormessagecheck &&
                                    <div class="box has-text-danger is-outlined">
                                               <span class="icon has-text-danger">
                                            <i class="fas fa-ban"></i>
                                        </span>
                                        { errorMessage };
                                    </div>
                                      } 
                                          { signuporlogin &&
                                <><section className="modal-card-body has-text-centered"><button className="button is-dark has-text-centered" onClick={handleChangeLogin}>
                                                    Login
                                                </button>
                                                    <button className="button is-light" onClick={handleChangeSignup}>
                                                        Sign Up
                                                    </button></section><section className="modal-card-body has-text-right">

                                                        <input className="input is-rounded has-icons-left" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                                        &nbsp;
                                                        <input className="input is-rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                                                        <a href="ForgotPassword">
                                                            <strong class="is-size-7">Forgot Password?</strong>
                                                        </a>
                                                    </section><footer className="modal-card-foot">
                                                        <button className="button is-light" onClick={login}>
                                                            Login
                                                        </button>
                                                        <button className="button is-dark" onClick={closeModal}>
                                                            Cancel
                                                        </button>
                                                    </footer></>
                        }
                        { !signuporlogin &&
                        <><section className="modal-card-body has-text-centered"><button className="button is-light has-text-centered" onClick={handleChangeLogin}>
                                                    Login
                                                </button>
                                                    <button className="button is-dark" onClick={handleChangeSignup}>
                                                        Sign Up
                                                    </button></section><section className="modal-card-body has-text-right">
                                                    <input className="input is-rounded" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                                    { username !== "" ?
                                                            <p className="has-text-success"> * Enter a username.</p> :
                                                            <p className="has-text-danger"> * Enter a username.</p>
                                                        }
                                                    &nbsp;
                                                        <input className="input is-rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                                        { userEmail.includes("@") ?
                                                            <p className="has-text-success"> * Your email address must contain "@".</p> :
                                                            <p className="has-text-danger"> * Your email address must contain "@".</p>
                                                        }
                                                        &nbsp;
                                                        <input className="input is-rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                        {regexPasswordTaille.test(userPassword) ?
                            <p className="has-text-success"> * Your password must be at least 8 characters in length.</p>:
                            <p className="has-text-danger"> * Your password must be at least 8 characters in length.</p>
                        }
                        {regexPasswordCarac.test(userPassword) ?
                            <p className="has-text-success">* Your password must contain at least one of these special characters: !@#$%&*()[].</p>:
                            <p className="has-text-danger">* Your password must contain at least one of these special characters: !@#$%&*()[].</p>
                        }
                        {regexPasswordMaj.test(userPassword) ?
                            <p className="has-text-success"> * Your password must contain at least one uppercase letter.</p>:
                            <p className="has-text-danger"> * Your password must contain at least one uppercase letter.</p>
                        }
                        {regexPasswordMin.test(userPassword) ?
                            <p className="has-text-success"> * Your password must contain at least one lowercase letter.</p>:
                            <p className="has-text-danger"> * Your password must contain at least one lowercase letter.</p>
                        }
                                                        &nbsp;
                                                        <input className="input is-rounded" type="password" placeholder="Confirm Password" onChange={(e) => setuserConfirmPassword(e.target.value)} />
                                                        { userPassword !== "" && userPassword === userConfirmPassword ?
                            <p className="has-text-success"> * Both the password and "confirm password" must be identical.</p>:
                            <p className="has-text-danger"> * Both the password and "confirm password" must be identical.</p>
                        }
                                                    </section><footer className="modal-card-foot">
                                                        <button className="button is-light" onClick={signUp}
                                                         disabled = {
                                                            !userEmail.includes("@")
                                                            || !regexPasswordTaille.test(userPassword)
                                                            || !regexPasswordMaj.test(userPassword)
                                                            || !regexPasswordMin.test(userPassword)
                                                            || userPassword !== userConfirmPassword
                                                            || username === ""
                                                        }>
                                                            Sign Up
                                                        </button>
                                                        <button className="button is-dark" onClick={closeModal}>
                                                            Cancel
                                                        </button>
                                                    </footer></> }
                    </div>
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            </>
               );
}
