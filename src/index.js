import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSvyxNzq3v1YVQSrG299c3L0CJMQ8kTUY",
    authDomain: "webmanga-fdfc2.firebaseapp.com",
    databaseURL: "https://webmanga-fdfc2-default-rtdb.firebaseio.com",
    projectId: "webmanga-fdfc2",
    storageBucket: "webmanga-fdfc2.appspot.com",
    messagingSenderId: "898066381799",
    appId: "1:898066381799:web:aa0efcfab8fde5e1071b42",
    measurementId: "G-BX018BQ29Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
