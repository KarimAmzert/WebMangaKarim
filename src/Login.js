import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TokenContexte} from "./ContextToken";

export function Login(){
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const contextToken = useContext(TokenContexte);

    const navigate = useNavigate();

    function cancel() {
        navigate("/");
    }

    const userCredentials = {
        email: userEmail,
        password: userPassword
    };
    async function login() {
        const urlAuth = `http://localhost:4000/auth/login`;
        const resUrlAuth = await fetch(urlAuth,{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },body:JSON.stringify(userCredentials)
        });
        if (resUrlAuth.ok) {
            const data = await resUrlAuth.json();
            console.log(data.token)
            sessionStorage.setItem("token", data.token);
            contextToken.setToken(sessionStorage.getItem("token"));
            navigate("/");
        } else {
            const data = await resUrlAuth.json();
            setErrorMessage(data.message);
            console.log("une erreur s'est productive lors de l'appel à /Login");
        }
    }


    return (
        <div className="notification">
            <div className="section">
                <h1 className="title is-1 has-text-centered ">Login</h1>
            </div>
            <div className="section">
                <div className="content">
                    {errorMessage !== "" &&
                        <div className="field">
                            <h4 className="title is-3 has-text-centered has-text-danger">{errorMessage}</h4>
                        </div>
                    }
                    <div className="field">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="control has-icons-left">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="e1234567@site.com"/>
                            <span className="icon is-small is-left"><i className="fa fa-envelope"></i></span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Mot de passe</label>
                        <div className="control has-icons-left">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="*******"
                                type="password"/>
                            <span className="icon is-small is-left"><i className="fa fa-lock"></i></span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="buttons">
                            <button className="button is-success" onClick={login}>
                                Connexion
                            </button>
                            <button className="button is-danger"onClick={cancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
