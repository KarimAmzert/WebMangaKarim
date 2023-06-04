import React, {useState} from "react";
import {useNavigate} from "react-router-dom";



export function ForgotPassword() {
    const [userEmail, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userCredentials = {
        email: userEmail,
        };
        
    function cancel() {
        navigate("/");
    }
    function handleChangeemail(event){
        setEmail(event.target.value);
        setErrorMessage("");
        setSuccessMessage("");
    }
    async function resetPass() {
        const urlreset = `http://localhost:4000/auth/resetPassword`;
        const resUrlReset = await fetch(urlreset, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            }, body: JSON.stringify(userCredentials)
        });
        if (resUrlReset.ok) {
            const data = await resUrlReset.json();
            console.log(data);
            setSuccessMessage(data.message)
        } else {
            const data = await resUrlReset.json();
            console.log(data);
            setErrorMessage(data.message)
        }
    }
    return (
        <><div className="notification">
            <div className="section">
                  <img src="/images/apple-touch-icon@2.png" alt="logo"/>
                <h1 className="title is-1 has-text-centered ">Reset your password</h1>
            </div>
            <div class="card">
                <div class="card-content">
                    <div className="field">
                    { successMessage !== "" ?
                     <><p className="has-text-success"><span class="icon has-text-success">
                     <i class="fas fa-check-square"></i>
                 </span> Instructions have successfully been sent. Please check inside your junkmail if you can't find the email.</p></> :
                            <p></p>
                        }
                         { errorMessage !== "" ?
                        <p className="has-text-danger"><span class="icon has-text-danger">
                        <i class="fas fa-ban"></i>
                    </span> { errorMessage } </p> :
                            <p></p>
                        }
                        <label className="label" htmlFor="email">Please enter your email address</label>
                        <div className="control has-icons-left">
                            <input
                                onChange={handleChangeemail}
                                className="input is-rounded"
                                placeholder="your email address" />
                            <span className="icon is-small is-left"><i className="fa fa-envelope"></i></span>
                            
                        </div>
                        <label className="label" htmlFor="email"> If your email address is found in our data, we'll email you instructions to reset the password.</label>
                    </div>
                    <button className="button is-dark is-rounded" onClick={resetPass}>
                        Reset Password
                    </button>
                    &nbsp;
                    <button className="button is-dark is-rounded" onClick={cancel}>
                        Go Back
                    </button>
                </div>
            </div>
        </div><div className="modal" id="modal1">
                <div className="modal-background"></div>
            </div></>
    );

}
