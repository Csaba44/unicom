import React from 'react';
import firebase from "../Firebase";

export default function Login() {
  function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(
          "---- ERROR ----\n" +
            errorCode +
            "\n" +
            errorMessage +
            "--------------"
        );
      });
  }


  return (
    <div className="login-container">
      <h1></h1>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
