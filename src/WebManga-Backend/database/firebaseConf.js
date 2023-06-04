// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");


// Your web app's Firebase configuration
const firebaseConfig  = {
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
exports.firebaseApplication = initializeApp(firebaseConfig);
