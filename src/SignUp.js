import {regexPasswordCarac, regexPasswordMaj,regexPasswordMin,regexPasswordTaille} from "./Constantes.js";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";



export function SignUp() {
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userConfirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const userCredentials = {
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword
    };

    function cancel() {
        navigate("/");
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
            navigate("/Login");
        } else {
            const data = await resUrlRegister.json();
            setErrorMessage(data.message);
        }
    }
    return (
        <div className="notification">
            <div className="section">
                <h1 className="title is-1 has-text-centered ">Sign Up</h1>
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
                        { userEmail.includes("@") ?
                            <p className="has-text-success"> ✓ Le courriel doit contenir contient le caractère "@".</p> :
                            <p className="has-text-danger"> ✗ Le courriel doit contenir contient le caractère "@".</p>
                        }
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
                        {regexPasswordTaille.test(userPassword) ?
                            <p className="has-text-success"> ✓ Le mot de passe contient au moins 8 caractères.</p>:
                            <p className="has-text-danger"> ✗ Le mot de passe contient au moins 8 caractères.</p>
                        }
                        {regexPasswordCarac.test(userPassword) ?
                            <p className="has-text-success"> ✓ Le mot de passe contient au moins un symbole parmi les suivants: !@#$%&*()[].</p>:
                            <p className="has-text-danger"> ✗ Le mot de passe contient au moins un symbole parmi les suivants: !@#$%&*()[].</p>
                        }
                        {regexPasswordMaj.test(userPassword) ?
                            <p className="has-text-success"> ✓ Le mot de passe contient au moins une lettre en majuscule.</p>:
                            <p className="has-text-danger"> ✗ Le mot de passe contient au moins une lettre en majuscule.</p>
                        }
                        {regexPasswordMin.test(userPassword) ?
                            <p className="has-text-success"> ✓ Le mot de passe contient au moins une lettre en minuscule.</p>:
                            <p className="has-text-danger"> ✗ Le mot de passe contient au moins une lettre en minuscule.</p>
                        }
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="conFirmPassword">Confirm Password</label>
                        <div className="control has-icons-left">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input"
                                placeholder="*******"
                                type="password"/>
                            <span className="icon is-small is-left"><i className="fa fa-lock"></i></span>
                        </div>
                        { userPassword !== "" && userPassword === userConfirmPassword ?
                            <p className="has-text-success"> ✓ Confirm Password et au Password doivent être identique.</p>:
                            <p className="has-text-danger"> ✗ Confirm Password et au Password doivent être identique.</p>
                        }

                    </div>
                    <div className="field">
                        <div className="buttons">
                            <button className="button is-success" onClick={signUp}
                                    disabled = {
                                        !userEmail.includes("@")
                                        || !regexPasswordTaille.test(userPassword)
                                        || !regexPasswordMaj.test(userPassword)
                                        || !regexPasswordMin.test(userPassword)
                                        || userPassword !== userConfirmPassword
                                    }
                            >
                                signUp
                            </button>
                            <button className="button is-danger" onClick={cancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}