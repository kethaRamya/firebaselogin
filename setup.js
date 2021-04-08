import React from 'react';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
    // we will place config here
    apiKey: "AIzaSyAHzdBrZjPuEryOdAgZ_2FM5REOTBoPOSU",
    authDomain: "fir-login-fa00f.firebaseapp.com",
    projectId: "fir-login-fa00f",
    storageBucket: "fir-login-fa00f.appspot.com",
    messagingSenderId: "117745979968",
    appId: "1:117745979968:web:4c71b265f63a4d1f2405a5",
    measurementId: "G-36KGFTJ22D"
}

if(firebase.app.length){
    firebase.initializeApp(firebaseConfig)
}

export default () => {
    return(firebase,auth)
}