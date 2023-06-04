import {useNavigate} from "react-router-dom";
import React from "react";

export default function NoMatch() {

    const navigate = useNavigate();

    function cancel() {
        navigate("/");
    }
    return (
        <div className="section">
            <h1 className="title is-1 has-text-centered">404</h1>
            <h2 className="title is-3 has-text-centered">Oops! This Page was not Found!</h2>
            <img src="/images/apple-touch-icon@2.png" alt="logo"/>
            <div className="has-text-centered">
                <button
                    className="button is-black"
                    onClick={cancel}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
}
